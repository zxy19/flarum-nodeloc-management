<?php

namespace Nodeloc\Management\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Api\Serializer\BasicUserSerializer;
use Nodeloc\Management\BaseConditionModel;
use Nodeloc\Management\Condition;
use InvalidArgumentException;
use Nodeloc\Management\ManageNotes;
use Xypp\LocalizeDate\Helper\CarbonZoneHelper;

class ManageNoteSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'nodeloc-manage-notes';

    protected $carbonZoneHelper;
    public function __construct(CarbonZoneHelper $carbonZoneHelper){
        $this->carbonZoneHelper = $carbonZoneHelper;
    }
    /**
     * {@inheritdoc}
     *
     * @throws InvalidArgumentException
     */
    protected function getDefaultAttributes($model)
    {
        if (!($model instanceof ManageNotes)) {
            throw new InvalidArgumentException(
                get_class($this) . ' can only serialize instances of ' . ManageNotes::class
            );
        }
        return [
            "content" => $model->content,
            "created_at" => $this->carbonZoneHelper->z($model->created_at)->toFormattedDateString(),
        ];
    }

    public function from_user($model)
    {
        return $this->hasOne($model, BasicUserSerializer::class, "from_user");
    }
    public function user($model)
    {
        return $this->hasOne($model, BasicUserSerializer::class, "user");
    }
}
