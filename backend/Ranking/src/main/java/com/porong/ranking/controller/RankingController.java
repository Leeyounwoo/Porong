package com.porong.ranking.controller;

import com.porong.ranking.domain.LocationVo;
import com.porong.ranking.domain.RequestDto;
import com.porong.ranking.service.ClearService;
import com.porong.ranking.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public void location(@RequestBody RequestDto requestDto){
        String coordinate = requestDto.getLongitude() +","+ requestDto.getLatitude();
        String locationName = null;
        locationName = locationService.getlocation(coordinate);
        double longitude = requestDto.getLongitude();
        double latitude = requestDto.getLatitude();
        if (locationName != null) {
            locationService.countLocation(locationName, latitude, longitude);
        }
        System.out.println(locationName);
    }

    @GetMapping("/location")
    public List<LocationVo> fetchRanking() {
<<<<<<< HEAD
        List<String> locations = locationService.getRanking();
        return locations.stream().map(LocationVo::new).collect(Collectors.toList());
=======
        List<LocationVo> locations = locationService.getRanking();
        return locations;
>>>>>>> 02b33bbcffdf2db226c8bbf8a2aae824c1cea950
    }

    @DeleteMapping("/clear")
    public void clearAll(){
        clearService.flushALl();
    }

}
