<?php
namespace App\Models\Interfaces\Users;

interface IUserUseCase
{
    public function handleCreateUser(array $data): array;
    public function handlePartialUser(string $id, array $data): array;
}
