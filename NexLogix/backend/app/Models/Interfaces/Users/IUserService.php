<?php
namespace App\Models\Interfaces\Users;

interface IUserService
{
    public function getAllUsers(): array;
    public function getUserById(int $id): array;
    public function createUser(array $data): array;
    public function updateSpecificFields(int $id, array $data): array;
    public function deleteUser(int $id): array;
}
 

// migracion a architectura de interfaces, como lo es en clean architecture
