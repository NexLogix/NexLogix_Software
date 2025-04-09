<?php

namespace App\Http\Controllers\Areas;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Areas\AreasService;
use App\UseCases\Areas\AreasUseCase;

class AreasController extends Controller
{
    protected AreasService $areasService;
    protected AreasUseCase $areasUseCase;

    public function __construct(AreasService $areasService, AreasUseCase $areasUseCase)
    {
        $this->areasService = $areasService;
        $this->areasUseCase = $areasUseCase;
    }

    public function showAll()
    {
        return response()->json($this->areasService->getAll(), 200);
    }

    public function showByID($id)
    {
        return response()->json($this->areasService->getAreaById($id));
    }

    public function createArea(Request $request)
    {
        $result = $this->areasUseCase->handleCreateArea($request->all());
        return response()->json($result, $result['status']);
    }

    public function updateArea(Request $request, $id)
    {
        $result = $this->areasUseCase->handleUpdateArea($id, $request->all());
        return response()->json($result, $result['status']);
    }

    public function updatePartialArea(Request $request, $id)
    {
        $result = $this->areasUseCase->handleUpdateSpecificSection($id, $request->all());
        return response()->json($result, $result['status']);
    }

    public function deleteArea($id)
    {
        return response()->json($this->areasService->deleteArea($id));
    }
}
