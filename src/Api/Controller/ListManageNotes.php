<?php

namespace Nodeloc\Management\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use Illuminate\Support\Arr;
use Laminas\Diactoros\Response\JsonResponse;
use Nodeloc\Management\Api\Serializer\ManageNoteSerializer;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Nodeloc\Management\ManageNotes;

class ListManageNotes extends AbstractListController
{
    public $serializer = ManageNoteSerializer::class;
    public $include = [
        'from_user'
    ];
    public function data(ServerRequestInterface $request, $document)
    {
        RequestUtil::getActor($request)->assertCan("manage_nodeloc");
        $userId = Arr::get($request->getQueryParams(), 'userId');
        return ManageNotes::where("user_id", $userId)->orderByDesc("created_at")->get();
    }
}