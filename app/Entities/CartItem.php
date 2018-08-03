<?php

namespace App\Entities;


class CartItem{
	
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