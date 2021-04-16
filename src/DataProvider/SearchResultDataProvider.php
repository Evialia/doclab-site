<?php

namespace App\DataProvider;

use ApiPlatform\Core\DataProvider\ContextAwareCollectionDataProviderInterface;
use App\Entity\SearchResult;
use App\Repository\SearchResultRepository;
use Doctrine\ORM\EntityManagerInterface;

class SearchResultDataProvider implements ContextAwareCollectionDataProviderInterface
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * {@inheritdoc}
     */
    public function getCollection(string $resourceClass, string $operationName = null, array $context = []): iterable
    {
        /** @var SearchResultRepository $repo */
        $repo = $this->entityManager->getRepository(SearchResult::class);
        $query = $context['filters']['query'];
        return $repo->findWithQuery($query);
    }

    /**
     * {@inheritdoc}
     */
    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        return $resourceClass === SearchResult::class;
    }
}
