<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Users\UserService;
use App\UseCases\Users\UserUseCase;
class UsersController extends Controller
{
    protected $userService;
    protected $userUseCase;

    public function __construct(UserService $userService, UserUseCase $userUseCase)
    {
        $this->userService = $userService;
        $this->userUseCase = $userUseCase;
    }

    // GET controller
    public function showAll()
    {
        $response = $this->userService->getAllPuestos();
        return response()->json($response, $response['status']);
    }

    // GET controller
    public function showByID($id)
    {
        $response = $this->userService->getUserById($id);
        return response()->json($response, $response['status']);
    }

    // POST controller
    public function createUser(Request $request)
    {
        $response = $this->userUseCase->handleCreateUser($request->all());
        return response()->json($response, $response['status']);
    }

    // PATCH controller / updatePartialUser
    public function updatePartialUser(Request $request, $id)
    {
        $userUpdated = $this->userUseCase->handlePartialUser($id, $request->all());
        return response()->json(
            $userUpdated,
            $userUpdated['status'],
        );
    }

    // DELETE controller / deleteUser
    public function deleteUser($id)
    {
        return response()->json($this->userService->deleteUser($id));
    }
}
