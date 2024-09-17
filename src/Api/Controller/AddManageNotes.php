<?php

namespace Nodeloc\Management\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
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

class AddManageNotes extends AbstractCreateController
{
    public $serializer = ManageNoteSerializer::class;
    public $include = [
        'from_user'
    ];

    public function data(ServerRequestInterface $request, $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan("manage_nodeloc");
        $attributes = Arr::get($request->getParsedBody(), 'data.attributes');
        $model = new ManageNotes;
        $model->content = Arr::get($attributes, 'content');
        $model->user_id = Arr::get($attributes, 'user_id');
        $model->from_user_id = $actor->id;
        $model->updateTimestamps();
        $model->save();
        return $model;
    }
}