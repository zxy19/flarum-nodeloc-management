<?php

/*
 * This file is part of nodeloc/nodeloc-management.
 *
 * Copyright (c) 2024 小鱼飘飘.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Nodeloc\Management;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Extend;
use Flarum\Http\RequestUtil;
use Nodeloc\Management\Api\Controller\AddManageNotes;
use Nodeloc\Management\Api\Controller\ListManageNotes;
use Nodeloc\Management\Api\Controller\UserManageBasicInfo;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/less/admin.less'),
    new Extend\Locales(__DIR__ . '/locale'),
    (new Extend\Routes('api'))
        ->get('/nodeloc-manage-notes', 'nodeloc-manage-notes.index', ListManageNotes::class)
        ->post('/nodeloc-manage-notes', 'nodeloc-manage-notes.add', AddManageNotes::class)
        ->get('/nodeloc-management', 'nodeloc-management.info', UserManageBasicInfo::class),
    (new Extend\ApiSerializer(ForumSerializer::class))
        ->attribute('nodeloc_management_available', function (ForumSerializer $serializer) {
            return RequestUtil::getActor($serializer->getRequest())->hasPermission('manage_nodeloc');
        }),
    (new Extend\Settings)
        ->serializeToForum("nodeloc_management.snippet", "nodeloc_management.snippet", function ($value) {
            return json_decode($value);
        })
];
