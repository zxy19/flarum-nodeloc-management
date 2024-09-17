<?php

namespace Nodeloc\Management\Api\Controller;

use Askvortsov\FlarumWarnings\Model\Warning;
use Flarum\Http\RequestUtil;
use Flarum\Http\UrlGenerator;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Tags\Tag;
use Flarum\User\User;
use Illuminate\Support\Arr;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Xypp\LocalizeDate\Helper\CarbonZoneHelper;

class UserManageBasicInfo implements RequestHandlerInterface
{

    protected SettingsRepositoryInterface $settings;
    protected $carbonZoneHelper;
    protected $url;
    public function __construct(SettingsRepositoryInterface $settings, CarbonZoneHelper $carbonZoneHelper, UrlGenerator $url)
    {
        $this->settings = $settings;
        $this->carbonZoneHelper = $carbonZoneHelper;
        $this->url = $url;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $data = [];
        RequestUtil::getActor($request)->assertCan("manage_nodeloc");
        $userId = Arr::get($request->getQueryParams(), 'userId');
        $user = User::findOrFail($userId);

        $modCount = Warning::where('user_id', $userId)->whereNull('hidden_at')->count();
        $mods = Warning::where('user_id', $userId)
            ->orderByDesc('created_at')
            ->whereNull('hidden_at')
            ->take(5)->get();
        $modsData = [];
        /**
         * @var Warning $mod
         */
        foreach ($mods as $mod) {
            $modsData[] = [
                'id' => $mod->id,
                'point' => $mod->strikes,
                'pb' => strip_tags($mod->public_comment),
                'pv' => strip_tags($mod->private_comment),
                'createdAt' => $this->carbonZoneHelper->z($mod->created_at)->toFormattedDateString(),
                'post' => [$mod->post->discussion_id, $mod->post->number],
                'user' => $mod->addedByUser->display_name
            ];
        }
        $data['mods'] = [
            'count' => $modCount,
            'data' => $modsData
        ];


        $blackholeId = $this->settings->get("nodeloc_management.blackholeId");

        $tag = $blackholeId ? Tag::find($blackholeId) : false;

        /**
         * @var Tag $tag
         */
        if ($tag) {
            $count = $discussions = $tag->discussions()->where("user_id", $userId)->count();
            $discussions = $tag->discussions()->where("user_id", $userId)->orderByDesc("created_at")->limit(5)->get();
            $blackholeData = [];
            /**
             * @var \Flarum\Discussion\Discussion $discussion
             */
            foreach ($discussions as $discussion) {
                $blackholeData[] = [
                    'id' => $discussion->id,
                    'title' => $discussion->title,
                    'createdAt' => $this->carbonZoneHelper->z($discussion->created_at)->toFormattedDateString()
                ];
            }
            $data['blackhole'] = [
                'count' => $count,
                'data' => $blackholeData
            ];
        }

        return new JsonResponse($data);
    }
}