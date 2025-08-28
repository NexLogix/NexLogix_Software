<?php
namespace App\Models\Interfaces\Users;

interface IUserService
{
    public function getAllUsers(): array;
    public function getUserById(string $value): array;
    public function createUser(array $data): array;
    public function updateSpecificFields(string $id, array $data): array;
    public function deleteUser(string $value): array;
}


// migracion a architectura de interfaces, como lo es en clean architecture
