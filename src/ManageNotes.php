<?php

namespace Nodeloc\Management;

use Flarum\Database\AbstractModel;
use Flarum\User\User;

/**
 * 
 * @property int $id
 * @property string $context
 * @property int $user_id
 * @property int $target_user_id
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon $created_at
 */
class ManageNotes extends AbstractModel
{
    protected $dates = ['updated_at', 'created_at'];
    protected $table = 'nodeloc_manage_notes_table';

    public function user()
    {
        return $this->hasOne(User::class);
    }
    public function from_user()
    {
        return $this->hasOne(User::class, "id", "from_user_id");
    }
}
