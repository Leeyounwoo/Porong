package com.porong.ranking.controller;

import com.porong.ranking.domain.LocationVo;
import com.porong.ranking.domain.RequestDto;
import com.porong.ranking.service.ClearService;
import com.porong.ranking.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("v1/ranking/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RankingController {

    @Autowired
    private final LocationService locationService;

    @Autowired
    private final ClearService clearService;

    @PostMapping("/postmessage")
    public void ramenView(@RequestBody RequestDto requestDto){
        String coordinate = requestDto.getLongitude() +","+ requestDto.getLatitude();
        String locationName = null;
        locationName = locationService.getlocation(coordinate);
        if (locationName != null) {
            locationService.countLocation(locationName);
        }
    }

    @GetMapping("/location")
    public List<LocationVo> fetchRanking() {
        List<String> locations = locationService.getRanking();
        return locations.stream().map(LocationVo::new).collect(Collectors.toList());
    }

    @DeleteMapping("/clear")
    public void clearAll(){
        clearService.flushALl();
    }


}
