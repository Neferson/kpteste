<?php

namespace App\Entities;


class CartItems{
	
	protected $items;

	public function __construct( $oldCart )
	{
		 $this->items = $oldcart->items;		 
	}

	public function setItems( $items )
	{
		return $items;
	}
}