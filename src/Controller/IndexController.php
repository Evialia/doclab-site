<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class IndexController extends AbstractController
{
    /**
     * Force all requests render the root template
     *
     * @Route(
     *     "/{reactRouting}", name="index",
     *     defaults={"reactRouting": null},
     *     requirements={"reactRouting": "^(?!api).+"}
     * )
     * @return Response
     */
    public function app()
    {
        return $this->render('base.html.twig');
    }
}
