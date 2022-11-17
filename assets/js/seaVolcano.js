let $submarine = $('#submarine');
let $volcanoPos = 0;

let $submarineLeft,
$submarineTop;

function isSubMarineInLeftSide() {
    return $submarine.css('transform') == 'matrix3d(-1, 0, -1.22465e-16, 0, 0, 1, 0, 0, 1.22465e-16, 0, -1, 0, 0, 0, 0, 1)';
}
function isSubMarineInRightSide() {
    return $submarine.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)';
}

// safari, FireFox 可兼容
class Worms {
    constructor() {
        this.wormsQty = [3, 3, 2];
        // this.wormsClassOffset = [0, 3, 6];
        this.wormsClassOffset = [0, 3, 7];
        this.wormsCatched = [0, 0, 0];
        this.$wormInCapsule = 0;
    }

    volcanoPosChang() {
        // console.log("volcanoPosChang $volcanoPos:",$volcanoPos);
        $('#frame_volcano .seaLight').css('width', 732 - $volcanoPos * 9 + 'px');
        $('#frame_volcano .worm1').css('right', 36 + $volcanoPos * 9 + 'px');
        $('#frame_volcano .worm2').css('right', 0 + $volcanoPos * 9 + 'px');
        $('#frame_volcano .worm3').css('right', -6 + $volcanoPos * 9 + 'px');
        $('#frame_volcano .worm4').css('right', -180 + $volcanoPos * 9 + 'px');
        $('#frame_volcano .worm5').css('right', -195 + $volcanoPos * 9 + 'px');
        $('#frame_volcano .worm6').css('right', -219 + $volcanoPos * 9 + 'px');
        $('#frame_volcano .worm7').css('right', -222 + $volcanoPos * 9 + 'px');
        $('#frame_volcano .worm8').css('right', -477 + $volcanoPos * 9 + 'px');
        $('#frame_volcano .worm9').css('right', -477 + $volcanoPos * 9 + 'px');
    }

    catchWarm(num) {
        this.showSubmarineCatch();
        $(`#frame_volcano .worm${num}`).hide();
        
        this.$wormInCapsule++;
        $('#frame_volcano #blank_Seaworm:nth-child('+ this.$wormInCapsule +')').addClass('show');

        this.wormInCapsule();
    }

    catchCluster(num) {
        // console.log('catchCluster(num):'+ num);
        // console.log("this.wormsCatched[num]:" + this.wormsCatched[num]);
        // console.log("this.wormsClassOffset[num]:" + this.wormsClassOffset[num]);

        if (this.wormsCatched[num] <= this.wormsQty[num]) {
            this.catchWarm(this.wormsCatched[num] + this.wormsClassOffset[num] + 1);
            this.wormsCatched[num] += 1;

        } else {
            // 空抓
            // console.log("空抓");
            this.showSubmarineCatch();
        }
        // console.log('$wormInCapsule: ', this.$wormInCapsule);
    }

    showSubmarineCatch() {
        $submarine.css('background-image', 'url(assets/img/scene-volcano_submarineCatch.gif)');
    }
    showSubmarineNoCatch() {
        // 空抓
        // console.log('不在抓取範圍');
        $submarine.css('background-image', 'url(assets/img/scene-volcano_submarineNoCatch.gif)');
    }

    wormInCapsule() {
        if (this.$wormInCapsule < 6) {
            $('#frame_volcano .catchedWorm' + this.$wormInCapsule).addClass('show');
        }
        if (this.$wormInCapsule == 5) {
            // 抓取成功
            this.volcanoEnding();
        }
    }

    // 抓取成功 animation
    volcanoEnding() {
        // 移除鍵盤控制
        window.removeEventListener('keydown', function () {
            console.log('removeEventListener keydown FAIL');
        });
        // $("#game_lightbox #bag").addClass("gotSeaWorm");
        // $gotSeaWorm = 1;
        if ($('.bag_space.L').hasClass('gotDesertWorm') == true) {
            $('.bag_space.R').addClass('gotSeaWorm');
        } else {
            $('.bag_space.L').addClass('gotSeaWorm');
        }

        //元素顯示
        setTimeout(function () {
            $('#frame_volcano #success').fadeIn();
            $('#frame_volcano #seawormCount').css('top', '-120px');
        }, 2500);

        //capsule顯示
        setTimeout(function () {
            $('#frame_volcano #capsule_top , #frame_volcano #capsule_hole , #frame_volcano #capsule_bottom').addClass('show');
        }, 4500);

        //膠囊闔起
        setTimeout(function () {
            $('#frame_volcano #capsule_top , #frame_volcano #capsule_hole , #frame_volcano #capsule_bottom').addClass('close');
        }, 5300);

        //膠囊上升＋字、按鈕（回家or前往下個地點）顯示
        setTimeout(function () {
            $('#frame_volcano #capsule').addClass('float');
            $('#frame_volcano #text').addClass('show');
            $('#frame_volcano #success_btn').addClass('show');
        }, 6500);
    }
    
    // 範圍內抓取worms
    catchWorms() {
        // console.log('$volcanoPos:', $volcanoPos);
        // console.log("LeftSide:",isSubMarineInLeftSide());
        // console.log("RightSide:",isSubMarineInRightSide());

        switch ($volcanoPos) {
            case 0:{
                // console.log('case 0');
                //抓取worm1, worm2, worm3
                if (isSubMarineInRightSide() && $submarineLeft > 592 && $submarineTop == 441) {
                    worms.catchCluster(0);
                }else{
                    worms.showSubmarineNoCatch()
                }
                break;
            }
            case 10:{
                // console.log('case 10');
                //抓取worm1, worm2, worm3
                if (isSubMarineInRightSide() && $submarineLeft > 502 && $submarineLeft < 594 && $submarineTop == 441) {
                    worms.catchCluster(0);
                }else{
                    worms.showSubmarineNoCatch()
                }
                break;
            }
            case 20:{
                // console.log('case 20');

                //抓取worm1, worm2, worm3
                if (isSubMarineInRightSide() && $submarineLeft > 442 && $submarineLeft < 534 && $submarineTop == 441) {
                    worms.catchCluster(0);
                } else if (isSubMarineInLeftSide() && $submarineLeft == 683 && $submarineTop == 441) {
                    worms.catchCluster(0);

                // 抓取worm4, worm5
                } else if (isSubMarineInRightSide() && $submarineLeft > 652 && $submarineLeft < 684 && $submarineTop > 380) {
                    worms.catchCluster(1);
                }else{
                    worms.showSubmarineNoCatch()
                }
                break;
            }
            case 30:{
                // console.log('case 30');

                //抓取worm1, worm2, worm3
                if (isSubMarineInRightSide() && $submarineLeft > 352 && $submarineLeft < 414 && $submarineTop == 430) {
                    worms.catchCluster(0);
                } else if (isSubMarineInLeftSide() && $submarineLeft > 562 && $submarineLeft < 654 && $submarineTop == 441) {
                    worms.catchCluster(0);
                
                // 抓取worm4, worm5, worm6, worm7
                } else if (
                    isSubMarineInRightSide() && $submarineLeft > 562 && $submarineLeft < 654 && $submarineTop > 380) {
                    worms.catchCluster(1);
                }else{
                    worms.showSubmarineNoCatch()
                }
                break;
            }
            case 40:{
                // console.log('case 40');

                //抓取worm1, worm2, worm3
                if (isSubMarineInRightSide() && $submarineLeft > 262 && $submarineLeft < 324 && $submarineTop == 441) {
                    worms.catchCluster(0);
                } else if (isSubMarineInLeftSide() && $submarineLeft > 472 && $submarineLeft < 532 && $submarineTop == 441) {
                    worms.catchCluster(0);
                
                // 抓取worm4, worm5, worm6, worm7
                } else if (
                    isSubMarineInRightSide() && $submarineLeft > 472 && $submarineLeft < 564 && $submarineTop > 380) {
                    worms.catchCluster(1);
                }else{
                    worms.showSubmarineNoCatch()
                }
                break;
            }
            case 50:{
                // console.log('case 50');

                //抓取worm1, worm2, worm3
                if (isSubMarineInRightSide() && $submarineLeft > 172 && $submarineLeft < 234 && $submarineTop == 441) {
                    worms.catchCluster(0);
                } else if (isSubMarineInLeftSide() && $submarineLeft > 382 && $submarineLeft < 444 && $submarineTop == 441) {
                    worms.catchCluster(0);
                    // 抓取worm4, worm5, worm6, worm7
                } else if (
                    isSubMarineInRightSide() && $submarineLeft > 382 && $submarineLeft < 474 && $submarineTop > 380) {
                    worms.catchCluster(1);
                } else if (isSubMarineInLeftSide() && $submarineLeft > 592 && $submarineLeft < 684 && $submarineTop > 410) {
                    worms.catchCluster(1);
                }else{
                    worms.showSubmarineNoCatch()
                }
                break;
            }
            case 60:{
                // console.log('case 60');
                //抓取worm1, worm2, worm3
                if (isSubMarineInRightSide() && $submarineLeft > 172 && $submarineLeft < 234 && $submarineTop == 441) {
                    worms.catchCluster(0);
                } else if (isSubMarineInLeftSide() && $submarineLeft > 292 && $submarineLeft < 354 && $submarineTop == 441) {
                    worms.catchCluster(0);

                // 抓取worm4, worm5, worm6, worm7
                } else if (isSubMarineInRightSide() && $submarineLeft > 292 && $submarineLeft < 354 && $submarineTop > 380) {
                    worms.catchCluster(1);
                } else if (isSubMarineInLeftSide() && $submarineLeft > 502 && $submarineLeft < 594 && $submarineTop > 380) {
                    worms.catchCluster(1);
                
                // 抓取worm8, worm9
                } else if (isSubMarineInRightSide() && $submarineLeft > 592 && $submarineLeft < 654 && $submarineTop > 170 && $submarineTop < 232) {
                    worms.catchCluster(2);
                }else{
                    worms.showSubmarineNoCatch()
                }
                break;
            }
            case 70:{
                // console.log('case 70');

                //抓取worm1, worm2, worm3
                if (isSubMarineInRightSide() && $submarineLeft > 22 && $submarineLeft < 54 && $submarineTop == 441) {
                    worms.catchCluster(0);
                } else if (isSubMarineInLeftSide() && $submarineLeft > 202 && $submarineLeft < 264 && $submarineTop == 441) {
                    worms.catchCluster(0);
                

                // 抓取worm4, worm5, worm6, worm7
                } else if (isSubMarineInRightSide() && $submarineLeft > 202 && $submarineLeft < 294 && $submarineTop > 380) {
                    worms.catchCluster(1);
                } else if (isSubMarineInLeftSide() && $submarineLeft > 412 && $submarineLeft < 504 && $submarineTop > 380) {
                    worms.catchCluster(1);
                

                // 抓取worm8, worm9
                } else if (isSubMarineInRightSide() && $submarineLeft > 502 && $submarineLeft < 564 && $submarineTop > 170 && $submarineTop < 232) {
                    worms.catchCluster(2);
                }else{
                    worms.showSubmarineNoCatch()
                }
                break;
            }
            case 80:{
                // console.log('case 80');

                //抓取worm1, worm2, worm3
                if (isSubMarineInLeftSide() && $submarineLeft > 112 && $submarineLeft < 174 && $submarineTop == 441) {
                    worms.catchCluster(0);
                

                // 抓取worm4, worm5, worm6, worm7
            } else if (isSubMarineInRightSide() && $submarineLeft > 112 && $submarineLeft < 204 && $submarineTop > 380) {
                    worms.catchCluster(1);
                } else if (isSubMarineInLeftSide() && $submarineLeft > 322 && $submarineLeft < 414 && $submarineTop > 380) {
                    worms.catchCluster(1);
                

                // 抓取worm8, worm9
            } else if (isSubMarineInRightSide() && $submarineLeft > 412 && $submarineLeft < 474 && $submarineTop > 170 && $submarineTop < 232) {
                    worms.catchCluster(2);
                } else if (isSubMarineInLeftSide() && $submarineLeft > 622 && $submarineLeft < 684 && $submarineTop > 170 && $submarineTop < 232) {
                    worms.catchCluster(2);
                }else{
                    worms.showSubmarineNoCatch()
                }
                break;
            }
            case 90:{
                // console.log('case 90');
                //抓取worm1, worm2, worm3
                if (isSubMarineInLeftSide() && $submarineLeft > 22 && $submarineLeft < 84 && $submarineTop == 441) {
                    worms.catchCluster(0);
                
                // 抓取worm4, worm5, worm6, worm7
                } else if (isSubMarineInRightSide() && $submarineLeft > 22 && $submarineLeft < 84 && $submarineTop > 380) {
                    worms.catchCluster(1);
                } else if (isSubMarineInLeftSide() && $submarineLeft > 232 && $submarineLeft < 324 && $submarineTop > 380) {
                    worms.catchCluster(1);

                // 抓取worm8, worm9
                } else if (isSubMarineInRightSide() && $submarineLeft > 322 && $submarineLeft < 354 && $submarineTop > 170 && $submarineTop < 232) {
                    worms.catchCluster(2);
                } else if (isSubMarineInLeftSide() && $submarineLeft > 592 && $submarineLeft < 564 && $submarineTop > 170 && $submarineTop < 232) {
                    worms.catchCluster(2);
                }else{
                    worms.showSubmarineNoCatch()
                }
                break;
            }
            case 100: { 
                // console.log('case 100');
                // 抓取worm4, worm5, worm6, worm7
                if (isSubMarineInLeftSide() && $submarineLeft > 142 && $submarineLeft < 234 && $submarineTop > 380) {
                    worms.catchCluster(1);
                
                // 抓取worm8, worm9
                } else if (isSubMarineInRightSide() && $submarineLeft > 232 && $submarineLeft < 264 && $submarineTop > 170 && $submarineTop < 232) {
                    worms.catchCluster(2);
                } else if (isSubMarineInLeftSide() && $submarineLeft > 442 && $submarineLeft < 474 && $submarineTop > 170 && $submarineTop < 232) {
                    worms.catchCluster(2);
                }else{
                    worms.showSubmarineNoCatch()
                }
                break;
            }
            default:{
                // console.log('不在抓取範圍');
                // 空抓
                $submarine.css('background-image', 'url(assets/img/scene-volcano_submarineNoCatch.gif)');
                break;
            }
        }

        // 停止抓取
        var catchSetInt = setInterval(function () {
            $submarine.css('background-image', 'url(assets/img/scene-volcano_submarine.svg)');
            // audio_footsteps.pause();
            clearInterval(catchSetInt);
        }, 2400);
    }
}

const worms = new Worms();

// START! WASD移動James's submarine
$('#frame_volcano #start_btn').click(function () {
    window.removeEventListener('keydown,keyup', function () {
        // console.log('removeEventListener keydown,keyup FAIL');
    });
    $('#frame_volcano #c_instruction').fadeOut();
    $('#frame_volcano #seawormCount').addClass('show');

    // WASD Space控制潛水艇
    $submarineLeft = $submarine.position().left;
    $submarineTop = $submarine.position().top;

    window.addEventListener(
        'keydown',
        function (e) {
            var keyID = e.code;

            if (keyID === 'KeyW') {
                // console.log('W');
                if ($submarineTop > 39) {
                    $submarineTop = $submarineTop - 30;
                    $submarine.css('top', $submarineTop + 'px');
                }
            }
            if (keyID === 'KeyA') {
                // console.log('A');

                if ($submarineLeft > 1) {
                    $submarine.css('transform', 'rotateY(180deg)');
                    $submarineLeft = $submarineLeft - 30;
                    $submarine.css('left', $submarineLeft + 'px');

                    // 控制背景向左
                } else if ($volcanoPos > 0) {
                    $volcanoPos = $volcanoPos - 10;
                    $('#frame_volcano').css('background-position', $volcanoPos + '% 100%');
                    // console.log('$volcanoPos:', $volcanoPos);

                    worms.volcanoPosChang();
                }
            }
            if (keyID === 'KeyS') {
                // console.log('S');
                if ($submarineTop < 430) {
                    $submarineTop = $submarineTop + 30;
                    $submarine.css('top', $submarineTop + 'px');
                }
            }
            if (keyID === 'KeyD') {
                // console.log('D');

                if ($submarineLeft < 700) {
                    $submarine.css('transform', 'rotateY(0deg)');
                    $submarineLeft = $submarineLeft + 30;
                    $submarine.css('left', $submarineLeft + 'px');

                    // 控制背景向右
                } else if ($volcanoPos < 100) {
                    $volcanoPos = $volcanoPos + 10;
                    $('#frame_volcano').css('background-position', $volcanoPos + '% 100%');
                    // console.log('$volcanoPos:', $volcanoPos);

                    worms.volcanoPosChang();
                }
            }
            if (keyID === 'Space') {
                // console.log('Spacebar');
                worms.catchWorms();
            }

            // console.log('$submarineLeft:' + $submarineLeft);
            // console.log('$submarineTop:' + $submarineTop);

            // worms隨 $volcanoBgPos改變位置
        },
        false
    );
});

export function volcanoSTART() {

    //opening
    setTimeout(() => {
        $('#frame_volcano').removeClass('opening');
    }, 1000);

    // Start
    setTimeout(() => {
        $('#frame_volcano #c_instruction').fadeIn();
        $('#frame_volcano #submarine').removeClass('beforeOpening');
    }, 4400);

    // 鍵盤控制 demo
    window.addEventListener(
        'keydown',
        function (e) {
            const demoID = e.code;

            if (demoID === 'KeyW') {
                // console.log('W');
                $('#frame_volcano #start_keyboard01 i:nth-child(1)').addClass('down');
            }
            if (demoID === 'KeyA') {
                // console.log('A');
                $('#frame_volcano #start_keyboard01 i:nth-child(2)').addClass('down');
            }
            if (demoID === 'KeyS') {
                // console.log('S');
                $('#frame_volcano #start_keyboard01 i:nth-child(3)').addClass('down');
            }
            if (demoID === 'KeyD') {
                // console.log('D');
                $('#frame_volcano #start_keyboard01 i:nth-child(4)').addClass('down');
            }
            if (demoID === 'Space') {
                // console.log('Spacebar');
                $('#frame_volcano #start_keyboard02 i:nth-child(1)').addClass('down');
            }
        },
        false
    );
    window.addEventListener(
        'keyup',
        function (e) {
            const keyupID = e.code;
            if (keyupID === 'KeyW') {
                // console.log('W');
                $('#frame_volcano #start_keyboard01 i:nth-child(1)').removeClass('down');
            }
            if (keyupID === 'KeyA') {
                // console.log('A');
                $('#frame_volcano #start_keyboard01 i:nth-child(2)').removeClass('down');
            }
            if (keyupID === 'KeyS') {
                // console.log('S');
                $('#frame_volcano #start_keyboard01 i:nth-child(3)').removeClass('down');
            }
            if (keyupID === 'KeyD') {
                // console.log('D');
                $('#frame_volcano #start_keyboard01 i:nth-child(4)').removeClass('down');
            }
            if (keyupID === 'Space') {
                // console.log('Spacebar');
                $('#frame_volcano #start_keyboard02 i:nth-child(1)').removeClass('down');
            }
        },
        false
    );
}