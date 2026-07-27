<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminPermissionController;
use App\Http\Controllers\AdminPostCategoriesController;
use App\Http\Controllers\AdminPostController;
use App\Http\Controllers\AdminProductCategoriesController;
use App\Http\Controllers\AdminProductController;
use App\Http\Controllers\AdminRoleController;
use App\Http\Controllers\AdminUserController;

Route::inertia('/', 'welcome')->name('home');

//AUTH
Route::get('/admin/login', [AdminAuthController::class, 'login'])->name('login');
Route::post('/admin/login/storeLogin', [AdminAuthController::class, 'storeLogin']);
Route::post('/admin/logout', [AdminAuthController::class, 'logout']);
Route::get('/admin/register', [AdminAuthController::class, 'register']);
Route::post('/admin/register/store', [AdminAuthController::class, 'store']);

Route::middleware(['auth:sanctum'])->group( function(){

    //DASHBOARD
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'read']);

    //USER
    Route::get('/admin/users', [AdminUserController::class, 'read']);
    Route::post('/admin/users/store', [AdminUserController::class, 'store']);
    Route::patch('/admin/users/{user}/update', [AdminUserController::class, 'update']);
    Route::delete('/admin/users/{user}/delete', [AdminUserController::class, 'delete']);

    //PERMISSION
    Route::get('/admin/users/permissions', [AdminPermissionController::class, 'read']);
    Route::post('/admin/users/permissions/store', [AdminPermissionController::class, 'store']);
    Route::patch('/admin/users/permissions/{permission}/update', [AdminPermissionController::class, 'update']);
    Route::delete('/admin/users/permissions/{permission}/delete', [AdminPermissionController::class, 'delete']);

    //ROLE
    Route::get('/admin/users/roles', [AdminRoleController::class, 'read']);
    Route::post('/admin/users/roles/store', [AdminRoleController::class, 'store']);
    Route::patch('/admin/users/roles/{role}/update', [AdminRoleController::class, 'update']);
    Route::delete('/admin/users/roles/{role}/delete', [AdminRoleController::class, 'delete']);
    ROute::get('/admin/users/roles/{role}/getPermissions', [AdminRoleController::class, 'getPermissions']);

    //PRODUCT
    Route::get('/admin/products', [AdminProductController::class, 'read']);

    //PRODUCT CATEGORY
    Route::get('/admin/products/categories', [AdminProductCategoriesController::class, 'read']);
    Route::post('/admin/products/categories/store', [AdminProductCategoriesController::class, 'store']);
    Route::patch('/admin/products/categories/{category}/update', [AdminProductCategoriesController::class, 'update']);
    Route::delete('/admin/products/categories/{category}/delete', [AdminProductCategoriesController::class, 'delete']);

    //POST
    Route::get('/admin/posts', [AdminPostController::class, 'read']);

    //POST CATEGORY
    Route::get('/admin/posts/categories', [AdminPostCategoriesController::class, 'read']);
    Route::post('/admin/posts/categories/store', [AdminPostCategoriesController::class, 'store']);
    Route::patch('/admin/posts/categories/{category}/update', [AdminPostCategoriesController::class, 'update']);
    Route::delete('/admin/posts/categories/{category}/delete', [AdminPostCategoriesController::class, 'delete']);

});