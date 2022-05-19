package com.porong.ranking.repository;

import com.porong.ranking.domain.Location;
import org.springframework.data.repository.CrudRepository;

public interface LocationRedisRepository extends CrudRepository<Location, Long> {
    Location findByLocation(String location);



}
