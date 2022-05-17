package com.porong.ranking.controller;

import com.porong.ranking.service.ClearService;
import com.porong.ranking.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
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

    @GetMapping("/view/{ramenId}")
    public void ramenView(@PathVariable("ramenId") Long ramenId){//, @PathVariable("userIp") Long userIp) {

        HttpServletRequest req = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String ip = req.getHeader("X-FORWARDED-FOR");
        if (ip == null) {
            ip = req.getRemoteAddr();
        }
        String userIp = ip;
        System.out.println(ip);
        locationService.saveRamenView(ramenId, userIp);
        System.out.println("not login view" + ramenId);
    }

    @GetMapping("/view/{ramenId}/{memberId}")
    public void ramenLoginView(@PathVariable("ramenId") Long ramenId, @PathVariable("memberId") Long memberId) {
        locationService.saveRamenLoginView(ramenId, memberId);
        System.out.println("login view" + ramenId +" "+memberId);
    }


    @GetMapping("/like/{ramenId}/{memberId}")
    public void ramenLike(@PathVariable("ramenId") Long ramenId, @PathVariable("memberId") Long memberId) {
        locationService.saveRamenLike(ramenId, memberId);
        System.out.println("like" + ramenId +" "+memberId);
    }

    @GetMapping("/ramen")
    public List<RamenVo> fetchPopRamen() {
        List<String> ramens = locationService.getPopRamen();
        System.out.println("read");
        return ramens.stream().map(RamenVo::new).collect(Collectors.toList());
    }

    @DeleteMapping("/clear")
    public void clearAll(){
        clearService.flushALl();
    }


}
