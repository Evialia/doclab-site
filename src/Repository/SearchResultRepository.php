<?php

namespace App\Repository;

use App\Entity\SearchResult;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Mapping;
use Doctrine\ORM\Query\ResultSetMapping;
use Wamania\Snowball\StemmerFactory;

class SearchResultRepository extends EntityRepository
{
    private $alias = 'd';

    public function __construct(
        EntityManagerInterface $em,
        Mapping\ClassMetadata $class
    ) {
        parent::__construct($em, $class);
    }

    public function findWithQuery(string $query)
    {
        $words = explode(' ', $query);

        $stemmer = StemmerFactory::create('en');
        $stemmedWords = array_map(function ($word) use ($stemmer) {
            return $stemmer->stem($word);
        }, $words);

        $parameters = [
            'query' => $query
        ];

        $termQuery = '';
        foreach ($stemmedWords as $index => $stemmedWord) {
            $termQuery .= "term SOUNDS LIKE :stemmedWord{$index} ";
            $parameters["stemmedWord{$index}"] = $stemmedWord;

            if (count($stemmedWords) !== $index + 1) {
                $termQuery .= 'OR ';
            }
        }

        $sql = "
            SELECT
                id,
                title,
                description,
                screenshot,
                url,
                authors,
                topic,
                score
            FROM (
                SELECT
                    id,
                    title,
                    description,
                    screenshot,
                    url,
                    authors,
                    topic,
                    MATCH(title, description) AGAINST(:query IN NATURAL LANGUAGE MODE) AS score
                FROM documents WHERE id IN (
                    SELECT document_id
                    FROM dictionary WHERE {$termQuery}
                ) AND MATCH(title, description) AGAINST(:query IN NATURAL LANGUAGE MODE) > 0 ORDER BY score DESC
            ) results WHERE score > 0
        ";

        $rsm = new ResultSetMapping();
        $rsm->addEntityResult(SearchResult::class, $this->alias);
        $rsm->addFieldResult($this->alias, 'id', 'id');
        $rsm->addFieldResult($this->alias, 'title', 'title');
        $rsm->addFieldResult($this->alias, 'description', 'description');
        $rsm->addFieldResult($this->alias, 'screenshot', 'screenshot');
        $rsm->addFieldResult($this->alias, 'url', 'url');
        $rsm->addFieldResult($this->alias, 'authors', 'authors');
        $rsm->addFieldResult($this->alias, 'topic', 'topic');

        $query = $this->getEntityManager()->createNativeQuery($sql, $rsm);
        $query->setParameters($parameters);

        $result = $query->getResult();
        if (count($result) > 0) {
            return $result;
        } else {
            return [];
        }
    }
}
