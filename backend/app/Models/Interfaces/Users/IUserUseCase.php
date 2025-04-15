<?php
namespace App\Models\Interfaces\Users;

interface IUserUseCase
{
    public function handleCreateUser(array $data): array;
    public function handlePartialUser(int $id, array $data): array;
}
