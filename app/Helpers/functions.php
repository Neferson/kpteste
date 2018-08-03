<?php

function dateTransformer( $date )
{
	$date = strtotime( $date );
	$date = date('d/m/Y', $date);
	return $date;
}

function moneyTransformer( $amount )
{
	$amount = number_format($amount, 2, ',', '.');
	return $amount;
}
