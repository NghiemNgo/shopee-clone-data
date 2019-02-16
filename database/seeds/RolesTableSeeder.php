<?php

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		DB::table('roles')->insert(['name' => 'Admin']);
		DB::table('roles')->insert(['name' => 'COO']);
		DB::table('roles')->insert(['name' => 'HR']);
		DB::table('roles')->insert(['name' => 'Team Leader']);
    }
}
