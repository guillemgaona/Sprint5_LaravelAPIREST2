<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'muscle_group',
        'description',
        'demo_image_url',
    ];

    public function sets()
    {
        return $this->hasMany(Set::class);
    }
}