import { volcanoSTART } from './seaVolcano.js';
///////  variable declaration  //////////////////

// 全域參數宣告
var $bag_spaceLR;

var $gameFrameleft = $('#game_frame').offset().left;

var $desertJeff = $('#desert_Jeff');
var $desert_Jeff_drawWater = $('#desert_Jeff_drawWater');
var $desertJeffLeft = 102;
var $desertPos = 0;

var $toHome, $toSea, $toDesert;
var $taking, $clicking, $bag_spaceLR, $mousePosX, $mousePosY, $ingredientsBlock;
    

// 判別Firefox
if (navigator.userAgent.indexOf('Firefox') !== -1) {
    $('body').addClass('isFireFox');
}

// 判別Safari
if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") < 0) {
    $('body').addClass('isSafari');
}

// desert 迴圈生成puzzle
for (let i = 1; i < 13; i++) {
    $('#bucket_puzzle02').append('<i id="puzzle02_' + i + '" style="background-image: url(assets/img/scene-desert_well_inner02-' + i + '.svg )"></i>');
}
for (let i = 1; i < 36; i++) {
    $('#bucket_puzzle03').append('<i id="puzzle03_' + i + '" style="background-image: url(assets/img/scene-desert_well_inner03-' + i + '.svg )"></i>');
}

function init() {
    // preload images
    var $preloadImages = new Array();
    function preloadImg() {
        for (let i = 0; i < 195; i++) {
            $preloadImages[i] = new Image();
        }
        // $preloadImages[1].src = "worksImg/motionGrapic.png";
        // $preloadImages[2].src = "worksImg/ROOM.png";
        // $preloadImages[3].src = "worksImg/BENNS.png";
        // $preloadImages[4].src = "worksImg/chinesePainting_cover.png";
        // $preloadImages[5].src = "worksImg/3D_anchor_cover.png";
        // $preloadImages[6].src = "worksImg/3Dcamping_cover.png";

        $preloadImages[7].src = "assets/img/scene-beginning_900x600.gif";
        $preloadImages[8].src = "assets/img/btn-orange.svg";
        $preloadImages[9].src = "assets/img/animatiom-weirdDoctorEquip_900x600.gif",
        $preloadImages[10].src = "assets/img/animatiom-weirdDoctorFront_900x600.gif",
        $preloadImages[11].src = "assets/img/animation-doctors_900x600.gif",
        $preloadImages[12].src = "assets/img/animation-homeSad_900x600.gif",
        $preloadImages[13].src = "assets/img/btn-open_bag.gif",
        $preloadImages[14].src = "assets/img/manA-walk.gif",
        $preloadImages[15].src = "assets/img/map-getoutSubmarine.gif",
        $preloadImages[16].src = "assets/img/map-intoSubmarine.gif",
        $preloadImages[17].src = "assets/img/map-Jeff_stand.gif",
        $preloadImages[18].src = "assets/img/map-Jeff_walk.gif",
        $preloadImages[19].src = "assets/img/scene-desert_camelCaravan.gif",
        $preloadImages[20].src = "assets/img/scene-desert_drawWater.gif",
        $preloadImages[21].src = "assets/img/scene-desert_man.gif",
        $preloadImages[22].src = "assets/img/scene-desert_manWalk.gif",
        $preloadImages[23].src = "assets/img/scene-desert_tumbleweed01.gif",
        $preloadImages[24].src = "assets/img/scene-desert_tumbleweed02.gif",
        $preloadImages[25].src = "assets/img/scene-desert_well_click.gif",
        $preloadImages[26].src = "assets/img/scene-desert_well.gif",
        $preloadImages[27].src = "assets/img/scene-finalEnding_900x600.gif",
        $preloadImages[28].src = "assets/img/scene-home-cat.gif",
        $preloadImages[29].src = "assets/img/scene-home-ingredients01.gif",
        $preloadImages[30].src = "assets/img/scene-home-ingredients02.gif",
        $preloadImages[31].src = "assets/img/scene-home-ingredientsBlockA.gif",
        $preloadImages[32].src = "assets/img/scene-home-ingredientsBlockB.gif",
        $preloadImages[33].src = "assets/img/scene-home-Jeffsitting.gif",
        $preloadImages[34].src = "assets/img/scene-home-plant.gif",
        $preloadImages[35].src = "assets/img/scene-home-stoveFire.gif",
        $preloadImages[36].src = "assets/img/scene-volcano_submarineCatch.gif",
        $preloadImages[37].src = "assets/img/scene-volcano_submarineNoCatch.gif",
        $preloadImages[38].src = "assets/img/scene-volcano_target.gif",
        $preloadImages[39].src = "assets/img/scene-volcano_worm_1.gif",
        $preloadImages[40].src = "assets/img/scene-volcano_worm_2.gif",
        $preloadImages[41].src = "assets/img/scene-volcano_worm_3.gif",
        $preloadImages[42].src = "assets/img/scene-volcano_worm_4.gif",
        $preloadImages[43].src = "assets/img/scene-volcano_worm_5.gif",
        $preloadImages[44].src = "assets/img/scene-volcano_worm_6.gif",
        $preloadImages[45].src = "assets/img/scene-volcano_worm_7.gif",
        $preloadImages[46].src = "assets/img/scene-volcano_worm_8.gif",
        $preloadImages[47].src = "assets/img/scene-volcano_worm_9.gif",
        $preloadImages[48].src = "assets/img/scene-desert_shot.png",
        $preloadImages[49].src = "assets/img/scene-desert_wind.png",
        $preloadImages[50].src = "assets/img/scene-doctorsBlur.png",
        $preloadImages[51].src = "assets/img/scene-volcano.png",
        $preloadImages[52].src = "assets/img/scene-volcano02.png",
        $preloadImages[53].src = "assets/img/scene-weirdDocter_shot.png",
        $preloadImages[54].src = "assets/img/bag-block.svg",
        $preloadImages[55].src = "assets/img/bag-close.svg",
        $preloadImages[56].src = "assets/img/bag-desertWorm.svg",
        $preloadImages[57].src = "assets/img/bag-seaWorm.svg",
        $preloadImages[58].src = "assets/img/bag.svg",
        $preloadImages[59].src = "assets/img/btn-bag.svg",
        $preloadImages[60].src = "assets/img/btn-blue_down.svg",
        $preloadImages[61].src = "assets/img/btn-blue.svg",
        $preloadImages[62].src = "assets/img/btn-desert_down.svg",
        $preloadImages[63].src = "assets/img/btn-desert.svg",
        $preloadImages[64].src = "assets/img/btn-home.svg",
        $preloadImages[65].src = "assets/img/btn-lan-en.svg",
        $preloadImages[66].src = "assets/img/btn-lan-zn.svg",
        $preloadImages[67].src = "assets/img/btn-map.svg",
        $preloadImages[68].src = "assets/img/btn-orange_down.svg",
        $preloadImages[69].src = "assets/img/curser.svg",
        $preloadImages[70].src = "assets/img/manA-stand.svg",
        $preloadImages[71].src = "assets/img/map-btn.svg",
        $preloadImages[72].src = "assets/img/map-lightbox.svg",
        $preloadImages[73].src = "assets/img/map-location_check.svg",
        $preloadImages[74].src = "assets/img/map-location_desert.svg",
        $preloadImages[75].src = "assets/img/map-location_here.svg",
        $preloadImages[76].src = "assets/img/map-location_home_here.svg",
        $preloadImages[77].src = "assets/img/map-location_home_hover.svg",
        $preloadImages[78].src = "assets/img/map-location_home.svg",
        $preloadImages[79].src = "assets/img/map-location_sea.svg",
        $preloadImages[80].src = "assets/img/map-main.svg",
        $preloadImages[81].src = "assets/img/map-sign_desert.svg",
        $preloadImages[82].src = "assets/img/map-sign_Jeff.svg",
        $preloadImages[83].src = "assets/img/map-sign_sea.svg",
        $preloadImages[84].src = "assets/img/map-submarine_down.svg",
        $preloadImages[85].src = "assets/img/map-submarine.svg",
        $preloadImages[86].src = "assets/img/scence-homeSad.svg",
        $preloadImages[87].src = "assets/img/scence-homeSadAD.svg",
        $preloadImages[88].src = "assets/img/scence-homeSadBegin.svg",
        $preloadImages[89].src = "assets/img/scence-homeSadCTAarrow.svg",
        $preloadImages[90].src = "assets/img/scence-homeSadCTAmap.svg",
        $preloadImages[91].src = "assets/img/scene-desert_bg1.svg",
        $preloadImages[92].src = "assets/img/scene-desert_bg2.svg",
        $preloadImages[93].src = "assets/img/scene-desert_bg3.svg",
        $preloadImages[94].src = "assets/img/scene-desert_BlankGeobacter.svg",
        $preloadImages[95].src = "assets/img/scene-desert_capsule_worm.svg",
        $preloadImages[96].src = "assets/img/scene-desert_capsule_worm1.svg",
        $preloadImages[97].src = "assets/img/scene-desert_drawWater.svg",
        $preloadImages[98].src = "assets/img/scene-desert_lightbox.svg",
        $preloadImages[99].src = "assets/img/scene-desert_miniWell.svg",
        $preloadImages[100].src = "assets/img/scene-desert_sand.svg",
        $preloadImages[101].src = "assets/img/scene-desert_sky.svg",
        $preloadImages[102].src = "assets/img/scene-desert_success_bg.svg",
        $preloadImages[103].src = "assets/img/scene-desert_well_bg.svg",
        $preloadImages[104].src = "assets/img/scene-desert_well_bucket.svg",
        $preloadImages[105].src = "assets/img/scene-desert_well_inner1_glow.svg",
        $preloadImages[106].src = "assets/img/scene-desert_well_inner01-01.svg",
        $preloadImages[107].src = "assets/img/scene-desert_well_inner01-02.svg",
        $preloadImages[108].src = "assets/img/scene-desert_well_inner1.svg",
        $preloadImages[109].src = "assets/img/scene-desert_well_inner2_glow.svg",
        $preloadImages[110].src = "assets/img/scene-desert_well_inner02-1.svg",
        $preloadImages[111].src = "assets/img/scene-desert_well_inner02-2.svg",
        $preloadImages[112].src = "assets/img/scene-desert_well_inner02-3.svg",
        $preloadImages[113].src = "assets/img/scene-desert_well_inner02-4.svg",
        $preloadImages[114].src = "assets/img/scene-desert_well_inner02-5.svg",
        $preloadImages[115].src = "assets/img/scene-desert_well_inner02-6.svg",
        $preloadImages[116].src = "assets/img/scene-desert_well_inner02-7.svg",
        $preloadImages[117].src = "assets/img/scene-desert_well_inner02-8.svg",
        $preloadImages[118].src = "assets/img/scene-desert_well_inner02-9.svg",
        $preloadImages[119].src = "assets/img/scene-desert_well_inner02-10.svg",
        $preloadImages[120].src = "assets/img/scene-desert_well_inner02-11.svg",
        $preloadImages[121].src = "assets/img/scene-desert_well_inner02-12.svg",
        $preloadImages[122].src = "assets/img/scene-desert_well_inner02.svg",
        $preloadImages[123].src = "assets/img/scene-desert_well_inner3_glow.svg",
        $preloadImages[124].src = "assets/img/scene-desert_well_inner03-1.svg",
        $preloadImages[125].src = "assets/img/scene-desert_well_inner03-2.svg",
        $preloadImages[126].src = "assets/img/scene-desert_well_inner03-3.svg",
        $preloadImages[127].src = "assets/img/scene-desert_well_inner03-4.svg",
        $preloadImages[128].src = "assets/img/scene-desert_well_inner03-5.svg",
        $preloadImages[129].src = "assets/img/scene-desert_well_inner03-6.svg",
        $preloadImages[130].src = "assets/img/scene-desert_well_inner03-7.svg",
        $preloadImages[131].src = "assets/img/scene-desert_well_inner03-8.svg",
        $preloadImages[132].src = "assets/img/scene-desert_well_inner03-9.svg",
        $preloadImages[133].src = "assets/img/scene-desert_well_inner03-10.svg",
        $preloadImages[134].src = "assets/img/scene-desert_well_inner03-11.svg",
        $preloadImages[135].src = "assets/img/scene-desert_well_inner03-12.svg",
        $preloadImages[136].src = "assets/img/scene-desert_well_inner03-13.svg",
        $preloadImages[137].src = "assets/img/scene-desert_well_inner03-14.svg",
        $preloadImages[138].src = "assets/img/scene-desert_well_inner03-15.svg",
        $preloadImages[139].src = "assets/img/scene-desert_well_inner03-16.svg",
        $preloadImages[140].src = "assets/img/scene-desert_well_inner03-17.svg",
        $preloadImages[141].src = "assets/img/scene-desert_well_inner03-18.svg",
        $preloadImages[142].src = "assets/img/scene-desert_well_inner03-19.svg",
        $preloadImages[143].src = "assets/img/scene-desert_well_inner03-20.svg",
        $preloadImages[144].src = "assets/img/scene-desert_well_inner03-21.svg",
        $preloadImages[145].src = "assets/img/scene-desert_well_inner03-22.svg",
        $preloadImages[146].src = "assets/img/scene-desert_well_inner03-23.svg",
        $preloadImages[147].src = "assets/img/scene-desert_well_inner03-24.svg",
        $preloadImages[148].src = "assets/img/scene-desert_well_inner03-25.svg",
        $preloadImages[149].src = "assets/img/scene-desert_well_inner03-26.svg",
        $preloadImages[150].src = "assets/img/scene-desert_well_inner03-27.svg",
        $preloadImages[151].src = "assets/img/scene-desert_well_inner03-28.svg",
        $preloadImages[152].src = "assets/img/scene-desert_well_inner03-29.svg",
        $preloadImages[153].src = "assets/img/scene-desert_well_inner03-30.svg",
        $preloadImages[154].src = "assets/img/scene-desert_well_inner03-31.svg",
        $preloadImages[155].src = "assets/img/scene-desert_well_inner03-32.svg",
        $preloadImages[156].src = "assets/img/scene-desert_well_inner03-33.svg",
        $preloadImages[157].src = "assets/img/scene-desert_well_inner03-34.svg",
        $preloadImages[158].src = "assets/img/scene-desert_well_inner03-35.svg",
        $preloadImages[159].src = "assets/img/scene-desert_well_inner03.svg",
        $preloadImages[160].src = "assets/img/scene-desert_well.svg",
        $preloadImages[161].src = "assets/img/scene-desert_wellDone.svg",
        $preloadImages[162].src = "assets/img/scene-desert_wind.svg",
        $preloadImages[163].src = "assets/img/scene-doctors_anima01.svg",
        $preloadImages[164].src = "assets/img/scene-finalEnding.svg",
        $preloadImages[165].src = "assets/img/scene-home-ingredients01.svg",
        $preloadImages[166].src = "assets/img/scene-home-ingredients02.svg",
        $preloadImages[167].src = "assets/img/scene-home-photo-l.svg",
        $preloadImages[168].src = "assets/img/scene-home-photo-s.svg",
        $preloadImages[169].src = "assets/img/scene-home.svg",
        $preloadImages[170].src = "assets/img/scene-lightbox.svg",
        $preloadImages[171].src = "assets/img/scene-sea_Blank.svg",
        $preloadImages[172].src = "assets/img/scene-sea_lightbox.svg",
        $preloadImages[173].src = "assets/img/scene-volcano_capsule_bottom.svg",
        $preloadImages[174].src = "assets/img/scene-volcano_capsule_hole.svg",
        $preloadImages[175].src = "assets/img/scene-volcano_capsule_top.svg",
        $preloadImages[176].src = "assets/img/scene-volcano_capsule_worm.svg",
        $preloadImages[177].src = "assets/img/scene-volcano_capsule.svg",
        $preloadImages[178].src = "assets/img/scene-volcano_keyboard01.svg",
        $preloadImages[179].src = "assets/img/scene-volcano_keyboard02.svg",
        $preloadImages[180].src = "assets/img/scene-volcano_keyboardDown01.svg",
        $preloadImages[181].src = "assets/img/scene-volcano_keyboardDown02.svg",
        $preloadImages[182].src = "assets/img/scene-volcano_openingBg.svg",
        $preloadImages[183].src = "assets/img/scene-volcano_seaLight.svg",
        $preloadImages[184].src = "assets/img/scene-volcano_submarine.svg",
        $preloadImages[185].src = "assets/img/scene-volcano_submarineWarm_1.svg",
        $preloadImages[186].src = "assets/img/scene-volcano_submarineWarm_2.svg",
        $preloadImages[187].src = "assets/img/scene-volcano_submarineWarm_3.svg",
        $preloadImages[188].src = "assets/img/scene-volcano_submarineWarm_4.svg",
        $preloadImages[189].src = "assets/img/scene-volcano_submarineWarm_5.svg",
        $preloadImages[190].src = "assets/img/scene-volcano_success_bg.svg",
        $preloadImages[191].src = "assets/img/scene-weirdDoctorBG.svg",
        $preloadImages[192].src = "assets/img/scene-weirdDoctorEquip.svg",
        $preloadImages[193].src = "assets/img/scene-weirdDoctorFront.svg",
        $preloadImages[194].src = "assets/img/scene-weirdDoctorMain.svg"
    } 
    preloadImg();

    // 防止 spaceber 滾動畫面
    window.addEventListener(
        'keydown',
        function (e) {
            var $windowKey = e.code;
            if ($windowKey === 'Space') {
                // preventScroll(e);
                e.preventDefault();
                return false;
            }
    }, false);
    //////////// ＬＩＧＨＴＢＯＸ ////////////////////

    // 點擊lightbox底 關閉所有lightbox
    $('#game_lightbox').click(function (event) {
        $('#game_lightbox').removeClass('c_showLightbox mapShow bagShow lightFrameShow');
        // audio_clickOff.play();
        event.stopPropagation(); // 阻止泡泡事件
    });
    // 背包
    $('.btn_bag').click(function (event) {
        $('#game_lightbox').removeClass('c_showLightbox mapShow bagShow lightFrameShow');
        $('#game_lightbox').addClass('c_showLightbox bagShow');
        event.stopPropagation(); // 阻止泡泡事件
    });
    // 地圖
    $('.btn_map').click(function (event) {
        $('#game_lightbox').removeClass('c_showLightbox mapShow bagShow lightFrameShow');
        $('#game_lightbox').addClass('c_showLightbox mapShow');
        event.stopPropagation(); // 阻止泡泡事件
    });
    // home 像框
    $('#photoS').click(function (event) {
        $('#game_lightbox').removeClass('c_showLightbox mapShow bagShow lightFrameShow');
        $('#game_lightbox').addClass('c_showLightbox lightFrameShow');
        event.stopPropagation(); // 阻止泡泡事件
    });
    //////////// ＬＩＧＨＴＢＯＸ end ///////////////
    ////////////  ＢＡＧ  /////////////////////////

    $('#bag').click(function (event) {
        event.stopPropagation(); // 阻止泡泡事件
    });
    $('#bag_close').click(function (event) {
        $('.c_showLightbox').removeClass('c_showLightbox mapShow bagShow lightFrameShow');
        event.stopPropagation(); // 阻止泡泡事件
    });
    
    function ifCatchBothBagShine() {
        if($('#bag').children().hasClass('gotSeaWorm') && $('#bag').children().hasClass('gotDesertWorm') ){
            $('.btn_bag').addClass('jump');
        }
    }

    ////////////  ＢＡＧ end  /////////////////////
    //////////// BAG CAPSULE TO HOME STOVE ///////
    $('.bag_space.L').click(function (e) {
        $('#bag').addClass('taking');
        $bag_spaceLR = 1;

        $mousePos(e);

        $clicking = $(this);
        taking($clicking);

        // 關閉包包
        $('.c_showLightbox').removeClass('c_showLightbox mapShow bagShow lightFrameShow');

        //放到爐子上，或關閉包包重置包包狀態
    });
    $('.bag_space.R').click(function (e) {
        $('#bag').addClass('taking');
        $bag_spaceLR = 2;

        $mousePos(e);

        $clicking = $(this);
        taking($clicking);

        // 關閉包包
        $('.c_showLightbox').removeClass('c_showLightbox mapShow bagShow lightFrameShow');
    });

    // 判別taking worm
    function taking() {
        if ($clicking.hasClass('gotSeaWorm') == true) {
            $taking = 1;
            $('#ingredientsBlock i').addClass('seaWorm');
        } else if ($clicking.hasClass('gotDesertWorm') == true) {
            $taking = 2;
            $('#ingredientsBlock i').addClass('desertWorm');
        } else {
            // console.log('sth went wrong :(');
        }
        mouseMove();
    }

    // 判別滑鼠位置
    function $mousePos(e) {
        $mousePosX = e.pageX - $('#game_frame').offset().left;
        $mousePosY = e.pageY - $('#game_frame').offset().top;
        // console.log("$mousePosX:",$mousePosX," ; $mousePosY:",$mousePosY);
    }

    // 跟隨滑鼠移動 獲取數值
    function mouseMove() {
        ingredientsMove();

        $(document).mousemove(function (e) {
            if ($taking == 1 || $taking == 2) {
                // console.log('$taking: ', $taking);

                $mousePos(e);
                ingredientsMove();
            }
        });
    }

    // 跟隨滑鼠移動 調整樣式
    function ingredientsMove() {
        $('#ingredientsBlock i').css({
            position: 'fixed',
            top: $mousePosY + 'px',
            left: $mousePosX + 'px',
        });
        // console.log('$mousePosXtop:', $mousePosX, ' ; $mousePosY:', $mousePosY);
    }

    // worm 加入鍋子
    $('#ingredientsBlock').click(function () {
        if ($taking == 1) {
            // console.log("A");

            setTimeout(function () {
                $('#ingredientsBlock #animaSea').show();
            }, 500);
            setTimeout(function () {
                $('#ingredientsBlock #animaSea').remove();
            }, 2000);

            $('#ingredientsBlock #A').addClass('full');
            removeOrigWorm();
        } else if ($taking == 2) {
            // console.log("B");

            setTimeout(function () {
                $('#ingredientsBlock #animaDesert').show();
            }, 500);
            setTimeout(function () {
                $('#ingredientsBlock #animaDesert').remove();
            }, 2000);

            $('#ingredientsBlock #B').addClass('full');
            removeOrigWorm();
        } else {
            // console.log('nothing put in');
        }
    });

    //  點其他位置，取消拿膠囊狀態
    $('#frame_home , #frame_home div:not(#ingredientsBlock)').click(function () {
        $('#bag').removeClass('taking');
        $taking, $mousePosX, ($mousePosY = 0);
    });

    // 移除背包worm
    function removeOrigWorm() {
        setTimeout(function () {
            $('#ingredientsBlock span').animate({ left: '24px' });
        }, 3000);

        // 是否finalEnding？
        if ($('#ingredientsBlock #A').hasClass('full') == true && $('#ingredientsBlock #B').hasClass('full') == true) {
            finalEnding();
        }

        $('#ingredientsBlock i').removeClass('seaWorm , desertWorm');
        $('#bag').removeClass('taking');

        if ($bag_spaceLR == 1) {
            $('.bag_space.L').removeClass('gotSeaWorm , gotDesertWorm');
            $('.bag_space.L').addClass('end');
        } else if ($bag_spaceLR == 2) {
            $('.bag_space.R').removeClass('gotSeaWorm , gotDesertWorm');
            $('.bag_space.R').addClass('end');
        } else {
            // console.log('sth went wrong :(');
        }

        // 移除所有相關數值
        $ingredientsBlock, $bag_spaceLR, $mousePosX, $mousePosY, $taking, ($clicking = '');
    }
    //////////// BAG CAPSULE TO HOME STOVE end ///
    ////////////   ＭＡＰ  /////////////////////////

    $('#map').click(function (event) {
        event.stopPropagation(); // 阻止泡泡事件
    });

    $('#map_close').click(function (event) {
        $('.c_showLightbox').removeClass('c_showLightbox mapShow bagShow lightFrameShow');
        event.stopPropagation(); // 阻止泡泡事件
    });

    // 地圖hover 顯示文字
    $('#map #location_home').mouseenter(function () {
        // console.log(":visible ",$("#map #map_text_bg").is(':visible'));
        if ($('#map #map_text_bg').is(':visible') == false) {
            $('#map #map_text').text('Home');
            $('#map #map_btn_y , #map #map_btn_n').hide();
            $('#map #map_text_bg').show();
        }
    });
    
    $('#map #location_desert').mouseenter(function () {
        // console.log(":visible ",$("#map #map_text_bg").is(':visible'));
        if ($('#map #map_text_bg').is(':visible') == false) {
            $('#map #map_text').text('Desert');
            $('#map #map_btn_y , #map #map_btn_n').hide();
            $('#map #map_text_bg').show();
        }
    });
    $('#map #location_sea').mouseenter(function () {
        // console.log(":visible ",$("#map #map_text_bg").is(':visible'));
        if ($('#map #map_text_bg').is(':visible') == false) {
            $('#map #map_text').text('Sea');
            $('#map #map_btn_y , #map #map_btn_n').hide();
            $('#map #map_text_bg').show();
        }
    });

    $('#map #location_home , #map #location_desert , #map #location_sea').mouseout(function () {
        mapMouseout();
    });
    
    function mapMouseout() {
        if ($toHome == 1 || $toSea == 1 || $toDesert == 1) {
        } else {
            $('#map #map_text_bg').hide();
            $('#map #map_text').text('');
        }
    }

    // 點擊地圖
    $('#map #location_home').click(function () {
        $toHome = 1;
        $('#map #map_text').text('Are you sure you want to go Home?');
        $('#map #map_btn_y , #map #map_btn_n').show();
        $('#map #map_text_bg').show();
    });
    $('#map #location_sea').click(function () {
        $toSea = 1;
        $('#map #map_text').text('Are you sure want to go to the Sea?');
        $('#map #map_btn_y , #map #map_btn_n').show();
        $('#map #map_text_bg').show();
    });
    $('#map #location_desert').click(function () {
        $toDesert = 1;
        $('#map #map_text').text('Are you sure want to go to Desert?');
        $('#map #map_btn_y , #map #map_btn_n').show();
        $('#map #map_text_bg').show();
    });

    // 地圖 是否前往？
    $('#map #map_btn_y').click(function () {
        $('#frame_home').removeClass('begining');

        $('#map #map_text_bg').hide();
        $('.toSea').removeClass('toSea');
        $('.toDesert').removeClass('toDesert');
        $('.desertToHome').removeClass('seaToHome desertToHome');
        $('.DesertToSea').removeClass('DesertToSea');
        $('.SeaToDesert').removeClass('SeaToDesert');
        $('.atSea').removeClass('atHome atSea atDesert');
        // $('.opening').removeClass('opening');

        // 解除 jeff, submarine 凍結（開關地圖會導致動畫重新跑）
        $('#map #map_jeff , #map #map_submarine').removeClass('paused');

        if ($('#map #location_home').hasClass('here') == true && $toSea == 1) {
            // Home to Sea 7s
            $('#map').addClass('toSea');
            $('#map .here').removeClass('here');

            setTimeout(function () {
                $('#map #location_sea').addClass('here');

                //// 前往sea
                $('.c_frameNow').removeClass('c_frameNow');
                $('#frame_volcano').addClass('c_frameNow');
                volcanoSTART();
            }, 6900);

            $toSea = 0;

            setTimeout(function () {
                $('#game_lightbox').removeClass('c_showLightbox mapShow bagShow lightFrameShow');
            }, 7400);

        } else if ($('#map #location_home').hasClass('here') == true && $toDesert == 1) {
            // Home to Desert 7s
            $('#map').addClass('toDesert');
            $('#map .here').removeClass('here');

            setTimeout(function () {
                $('#map #location_desert').addClass('here');
                $('.c_frameNow').removeClass('c_frameNow');
                $('#frame_desert').addClass('c_frameNow');
                desertSTART();
            }, 6900);

            $toDesert = 0;
            setTimeout(function () {
                $('#game_lightbox').removeClass('c_showLightbox mapShow bagShow lightFrameShow');
            }, 7900);

        } else if ($('#map #location_desert').hasClass('here') == true && $toSea == 1) {
            // Desert to Sea 15s
            $('#map').addClass('DesertToSea');
            $('#map .here').removeClass('here');

            setTimeout(function () {
                $('#map #location_sea').addClass('here');

                //// 前往sea
                // $('#frame_volcano').addClass('open');
                $('.c_frameNow').removeClass('c_frameNow');
                $('#frame_volcano').addClass('c_frameNow');
                volcanoSTART();
            }, 14900);

            $toSea = 0;
            setTimeout(function () {
                $('#game_lightbox').removeClass('c_showLightbox mapShow bagShow lightFrameShow');
            }, 15400);

        } else if ($('#map #location_desert').hasClass('here') == true && $toHome == 1) {
            // Desert to Home 6s
            $('#map').removeClass('toDesert');
            $('#map').addClass('desertToHome');
            $('#map .here').removeClass('here');

            setTimeout(function () {
                $('#map #location_home').addClass('here');
                $('.c_frameNow').removeClass('c_frameNow');
                $('#frame_home').addClass('c_frameNow');
                homeSTART();
            }, 5900);

            $toHome = 0;
            setTimeout(function () {
                ifCatchBothBagShine()
                $('#game_lightbox').removeClass('c_showLightbox mapShow bagShow lightFrameShow');
            }, 6900);

        } else if ($('#map #location_sea').hasClass('here') == true && $toHome == 1) {
            // Sea to Home 7s 不明頓點？？？
            $('#map').removeClass('toSea');
            $('#map').addClass('SeaToHome');
            $('#map .here').removeClass('here');

            setTimeout(function () {
                $('#map #location_home').addClass('here');
                $('.c_frameNow').removeClass('c_frameNow');
                $('#frame_home').addClass('c_frameNow');
                homeSTART();
            }, 6900);

            $toHome = 0;
            setTimeout(function () {
                ifCatchBothBagShine()
                $('#game_lightbox').removeClass('c_showLightbox mapShow bagShow lightFrameShow');
            }, 7900);
        } else if ($('#map #location_sea').hasClass('here') == true && $toDesert == 1) {
            // Sea to Desert 15s 測試中
            $('#map').addClass('SeaToDesert');
            $('#map .here').removeClass('here');

            setTimeout(function () {
                $('#map #location_desert').addClass('here');
                $('.c_frameNow').removeClass('c_frameNow');
                $('#frame_desert').addClass('c_frameNow');
                desertSTART();
            }, 14900);

            $toDesert = 0;
            setTimeout(function () {
                $('#game_lightbox').removeClass('c_showLightbox mapShow bagShow lightFrameShow');
            }, 15900);
        } else {
            // console.log('something went wrong :(');
        }
    });
    $('#map #map_btn_n').click(function () {
        $('#map #map_text_bg').hide();
    });

    // 地圖 回家提示
    function checkGotBothworms() {
        if($('#map').hasClass('dsertFin') && $('#map').hasClass('seaFin') ){
            $('#location_home').addClass('goHomeHint');
        }
    }
    ////////////   ＭＡＰ end   //////////////////////
    ////////////   ＢＥＧＩＮＩＮＧ  ///////////////////
    setTimeout(function () {
        $('#game_menu #menu_start').removeClass("hide");
        $('#game_menu #menu_bar').remove();
    }, 16000);

    $('#game_menu #menu_start').click(function () {
        $('#game_frame').addClass('starting');
        doctorSTART();
    });
    ////////////   ＢＥＧＩＮＩＮＧ end  ///////////////
    ////////////   ＤＯＣＴＯＲＳ  /////////////////////
    function doctorSTART() {
        // 模糊效果
        for (let $i = 5; $i < 21; $i++) {
            // console.log('$i:', $i);

            let $doctorBurTimeout = setTimeout(function () {
                if ($('#doctors_opening feMorphology:nth-child(5)').attr('radius') == 2) {
                    setTimeout(function () {
                        $doctorBurTimeout = 0;
                        $('#doctors_opening').remove();
                    }, 100);
                } else {
                    $('#doctors_opening feMorphology:nth-child(5)').remove();
                }
            }, 90 * $i);
        }
        setTimeout(function () {
            $('#game_menu').remove();
        }, 1200);

        // 醫師診斷 貓快死了
        setTimeout(function () {
            // $('#frame_doctors #doctors_anima01').css('background-image', 'url(assets/img/animation-doctors01.gif)');
            $('#frame_doctors #doctors_anima01').css('background-image', 'url(assets/img/animation-doctors_900x600.gif)');
        }, 1460);

        setTimeout(function () {
            $('#frame_doctors #doctors_img01').css({ 'z-index': '2', opacity: '1' });
            $('#frame_doctors #doctors_anima01').remove();
        }, 10660);

        // 轉場
        setTimeout(function () {
            $('#frame_doctors #doctors_img01').css('top', '-100%');
            $('#frame_doctors #doctors_homeSadBegin').css({ 'z-index': '2', opacity: '1', top: '0%' });
            $('#frame_doctors #doctors_BG').css('background-color', '#2e333c');
        }, 11660);

        // 回家哭哭，撿傳單
        setTimeout(function () {
            // $('#frame_doctors #doctors_homeSad').css('background-image', 'url(assets/img/animation-homeSad.gif)'); // 9.5s
            $('#frame_doctors #doctors_homeSad').css('background-image', 'url(assets/img/animation-homeSad_900x600.gif)'); // 9.5s
            $('#frame_doctors #doctors_img01').remove();
        }, 12760);

        setTimeout(function () {
            $('#frame_doctors #doctors_homeSadImg').css({ 'z-index': '5', opacity: '1' });
        }, 21760);

        // 傳單pop up
        setTimeout(function () {
            $('#frame_doctors #doctors_homeSadBegin').remove();
            $('#frame_doctors #doctors_homeSad').remove();
            $('#frame_doctors #doctors_homeSadAD').css({ 'z-index': '7', top: '50%' });
        }, 22560);

        // 點擊前往怪奇實驗室
        $('#frame_doctors #doctors_homeSadCTA').click(function () {
            $('#frame_doctors #doctors_homeSadImg').css({ transition: 'top 1.0s', top: '-100%' });
            $('#frame_doctors #weirdDoctorBG').css({ top: '0%' });
            $('#frame_doctors #doctors_BG').css('background-color', '#251e35');

            // 轉場
            setTimeout(function () {
                $('#frame_doctors #doctors_homeSadAD').css('top', '160%');
                $('#frame_doctors #doctors_weirdDoctorEquip , #frame_doctors #doctors_weirdDoctorFront').css({ top: '0%' });
                $('#frame_doctors #doctors_homeSadImg').remove();
            }, 1000);

            // weirdDoctorEquip 動畫開始
            setTimeout(function () {
                // $('#frame_doctors #doctors_animaEquip').css('background-image', 'url(assets/img/animatiom-weirdDoctorEquip.gif)'); // 8.3s
                $('#frame_doctors #doctors_animaEquip').css('background-image', 'url(assets/img/animatiom-weirdDoctorEquip_900x600.gif)'); // 3s
                $('#frame_doctors #doctors_weirdDoctorFront').addClass('show');
            }, 2000);

            setTimeout(function () {
                $('#frame_doctors #doctors_homeSadAD').remove();
                $('#frame_doctors #doctors_animaEquip').remove();
                $('#frame_doctors #doctors_weirdDoctorEquip').addClass('fade');
            // }, 10300);
            }, 5000);

            // weirdDoctorFront 動畫開始
            setTimeout(function () {
                // $('#frame_doctors #doctors_animaFront').css('background-image', 'url(assets/img/animatiom-weirdDoctorFront.gif)'); // 29s
                $('#frame_doctors #doctors_animaFront').css('background-image', 'url(assets/img/animatiom-weirdDoctorFront_900x600.gif)'); // 29s
                $('#frame_doctors #doctors_weirdDoctorFront').remove();
            // }, 10800);
            }, 5500);

            setTimeout(function () {
                //返家
                $('#frame_home').addClass('begining');
            // }, 37800);
            }, 32500);

            setTimeout(function () {
                $('#frame_doctors #doctors_weirdDoctorMain').css('opacity', '1');
                $('#frame_doctors #doctors_animaFront').remove();
            // }, 39800);
            }, 34500);

            // 返家後開啟地圖
            setTimeout(function () {
                $('#game_lightbox').addClass('c_showLightbox mapShow');
                $('#map #map_text').text('Where do you want to go first?');
                $('#map #map_btn_y , #map #map_btn_n').hide();
                $('#map #map_text_bg').show();

                $('#frame_btnBtm').removeClass('hide');
                $('#frame_doctors').remove();
            // }, 41500);
            }, 36200);
        });
    }

    ////////////   ＤＯＣＴＯＲＳ end  ////////////////
    ////////////   ＨＯＭＥ  /////////////////////////

    // 點擊畫面移動James
    function homeSTART() {
        $('#frame_home').addClass('opening');
        $('#frame_home').show();
    }
    ////////////   ＨＯＭＥ end  /////////////////////
    ////////////   ＳＥＡ ＶＯＬＣＡＮＯ   /////////////

    // capsule放進包包 animation
    $('#frame_volcano #success_btn').click(function () {
        $(this).fadeOut();
        $('#frame_volcano #text').removeClass('show');
        $('#frame_volcano #success_bg').addClass('hide');
        $('#frame_volcano #capsule').addClass('shrink');
        $('#frame_btnBtm .btn_bagOpen').addClass('open');

        //移除包包打開gif
        setTimeout(function () {
            $('#frame_btnBtm .btn_bagOpen').removeClass('open');
        }, 1810);

        setTimeout(function () {
            $('#map #map_text').text('Where do you want to go next?');
            $('#map #map_text_bg').show();
            $('#map #map_btn_y , #map #map_btn_n').hide();

            // 自動開啟地圖
            $('#game_lightbox').removeClass('c_showLightbox mapShow bagShow lightFrameShow');
            $('#game_lightbox').addClass('c_showLightbox mapShow');
        }, 2210);

        setTimeout(function () {
            $('#frame_volcano #success').fadeOut();
        }, 2510);

        setTimeout(function () {
            // 移除 Map Sea
            $('#map').addClass('seaFin');
            checkGotBothworms();
        }, 4510);
    });
    
    ////////////   ＳＥＡ ＶＯＬＣＡＮＯ end   ///////////////////
    ////////////   ＤＥＳＥＲＴ   ///////////////////
    function desertSTART() {
        $('#frame_desert').addClass('opening');
        $('#frame_desert').show();

        // Start
        setTimeout(() => {
            $('#frame_desert #c_instruction').fadeIn();
        }, 3900);


        // 鍵盤控制 demo
        window.addEventListener(
            'keydown',
            function (e) {
                var desertDemoID = e.code;

                if (desertDemoID === 'KeyA') {
                    // console.log('A');
                    $('#frame_desert #start_keyboard01 i:nth-child(1)').addClass('down');
                }
                if (desertDemoID === 'KeyD') {
                    // console.log('D');
                    $('#frame_desert #start_keyboard01 i:nth-child(2)').addClass('down');
                }
                if (desertDemoID === 'Space') {
                    // console.log('Spacebar');
                    $('#frame_desert #start_keyboard02 i:nth-child(1)').addClass('down');
                }
            },
            false
        );
        window.addEventListener(
            'keyup',
            function (e) {
                var desertDemokeyupID = e.code;
                if (desertDemokeyupID === 'KeyA') {
                    // console.log('A');
                    $('#frame_desert #start_keyboard01 i:nth-child(1)').removeClass('down');
                }
                if (desertDemokeyupID === 'KeyD') {
                    // console.log('D');
                    $('#frame_desert #start_keyboard01 i:nth-child(2)').removeClass('down');
                }
                if (desertDemokeyupID === 'Space') {
                    // console.log('Spacebar');
                    $('#frame_desert #start_keyboard02 i:nth-child(1)').removeClass('down');
                }
            },
            false
        );

        // START!
        $('#frame_desert #start_btn').click(function () {
            window.removeEventListener('keydown,keyup', function () {
                // console.log('removeEventListener keydown,keyup FAIL');
            });
            $('#frame_desert #c_instruction').fadeOut();

            // camelCaravan 1s move 1 pixel
            var $camelCaravanPos = 640;
            setInterval(() => {
                if ($camelCaravanPos < -218) {
                    $camelCaravanPos = 2010;
                }
                $camelCaravanPos = $camelCaravanPos - 3;
                // console.log($camelCaravanPos);
                $('#desert_camelCaravan').css('left', $camelCaravanPos + 'px');
            }, 1000);

            // AD Space 控制Jeff
            window.addEventListener(
                'keydown',
                function (e) {
                    var desertKeyID = e.code;
                    var $desertJeffOffsetDistance = parseInt($('#desert_Jeff').offset().left) - parseInt($gameFrameleft);

                    // console.log('$desertPos: ', $desertPos);
                    // console.log("$desertJeffLeft: ",$desertJeffLeft);
                    // console.log('$desertJeffOffsetDistance: ', $desertJeffOffsetDistance);

                    if (desertKeyID === 'KeyA') {
                        // console.log('A');
                        $desertJeff.css('background-image', 'url(assets/img/scene-desert_manWalk.gif)');
                        $desertJeff.css({'-webkit-transform':'rotateY(180deg)','-moz-transform':'rotateY(180deg)','-ms-transform':'rotateY(180deg)','transform':'rotateY(180deg)'});

                        if ($desertJeffOffsetDistance > 101) {
                            $desertJeffLeft = $desertJeffLeft - 12;
                            $desertJeff.css('left', $desertJeffLeft + 'px');
                        } else {
                            // 控制背景向右
                            if ($desertPos < 0) {
                                $desertPos = $desertPos + 12;
                                $('#frame_desert').css('left', $desertPos + 'px');
                                $desertJeffLeft = $desertJeffLeft - 12;
                                $desertJeff.css('left', $desertJeffLeft + 'px');
                            }
                        }
                    }
                    if (desertKeyID === 'KeyD') {
                        // console.log('D');

                        $desertJeff.css({'-webkit-transform':'rotateY(0deg)','-moz-transform':'rotateY(0deg)','-ms-transform':'rotateY(0deg)','transform':'rotateY(0deg)'});

                        if ($desertPos > -1044) {
                            // console.log('$desertPos:', $desertPos);

                            if ($desertJeffOffsetDistance < 700) {
                                $desertJeff.css('background-image', 'url(assets/img/scene-desert_manWalk.gif)');

                                $desertJeffLeft = $desertJeffLeft + 12;
                                $desertJeff.css('left', $desertJeffLeft + 'px');
                            } else {
                                $desertPos = $desertPos - 12;
                                $('#frame_desert').css('left', $desertPos + 'px');
                                $desertJeffLeft = $desertJeffLeft + 12;
                                $desertJeff.css('left', $desertJeffLeft + 'px');
                            }
                        } else {
                            if ($desertJeffOffsetDistance < 700) {
                                $desertJeff.css('background-image', 'url(assets/img/scene-desert_manWalk.gif)');

                                $desertJeffLeft = $desertJeffLeft + 12;
                                $desertJeff.css('left', $desertJeffLeft + 'px');
                            }
                        }
                    }

                    // Jeff隨沙丘改變高度
                    if (desertKeyID === 'KeyA' || desertKeyID === 'KeyD') {
                        // console.log('$desertJeffLeft: ', $desertJeffLeft);

                        // 第一個沙丘開始
                        if ($desertJeffLeft > 161 && $desertJeffLeft < 187) {
                            $desertJeff.css('bottom', '27px');
                        } else if ($desertJeffLeft > 186 && $desertJeffLeft < 223) {
                            $desertJeff.css('bottom', '24px');
                        } else if ($desertJeffLeft > 221 && $desertJeffLeft < 247) {
                            $desertJeff.css('bottom', '21px');
                        } else if ($desertJeffLeft > 246 && $desertJeffLeft < 271) {
                            $desertJeff.css('bottom', '18px');
                        } else if ($desertJeffLeft > 270 && $desertJeffLeft < 295) {
                            $desertJeff.css('bottom', '15px');
                        } else if ($desertJeffLeft > 294 && $desertJeffLeft < 367) {
                            $desertJeff.css('bottom', '12px');
                        } else if ($desertJeffLeft > 365 && $desertJeffLeft < 475) {
                            $desertJeff.css('bottom', '9px');
                        } else if ($desertJeffLeft > 474 && $desertJeffLeft < 532) {
                            $desertJeff.css('bottom', '12px');
                        } else if ($desertJeffLeft > 531 && $desertJeffLeft < 571) {
                            $desertJeff.css('bottom', '15px');
                        } else if ($desertJeffLeft > 570 && $desertJeffLeft < 631) {
                            $desertJeff.css('bottom', '18px');
                        } else if ($desertJeffLeft > 630 && $desertJeffLeft < 643) {
                            $desertJeff.css('bottom', '21px');
                        } else if ($desertJeffLeft > 644 && $desertJeffLeft < 655) {
                            $desertJeff.css('bottom', '24px');
                        } else if ($desertJeffLeft > 654 && $desertJeffLeft < 655) {
                            $desertJeff.css('bottom', '27px');
                        } else if ($desertJeffLeft > 644 && $desertJeffLeft < 667) {
                            $desertJeff.css('bottom', '30px');
                        } else if ($desertJeffLeft > 666 && $desertJeffLeft < 679) {
                            $desertJeff.css('bottom', '33px');
                        } else if ($desertJeffLeft > 678 && $desertJeffLeft < 691) {
                            $desertJeff.css('bottom', '36px');
                        } else if ($desertJeffLeft > 690 && $desertJeffLeft < 703) {
                            $desertJeff.css('bottom', '39px');
                        } else if ($desertJeffLeft > 702 && $desertJeffLeft < 715) {
                            $desertJeff.css('bottom', '42px');
                        } else if ($desertJeffLeft > 714 && $desertJeffLeft < 727) {
                            $desertJeff.css('bottom', '45px');
                        } else if ($desertJeffLeft > 726 && $desertJeffLeft < 703) {
                            $desertJeff.css('bottom', '48px');
                        } else if ($desertJeffLeft > 702 && $desertJeffLeft < 739) {
                            $desertJeff.css('bottom', '51px');
                        } else if ($desertJeffLeft > 738 && $desertJeffLeft < 751) {
                            $desertJeff.css('bottom', '54px');

                            // 第二個沙丘開始
                        } else if ($desertJeffLeft > 750 && $desertJeffLeft < 775) {
                            $desertJeff.css('bottom', '51px');
                        } else if ($desertJeffLeft > 774 && $desertJeffLeft < 787) {
                            $desertJeff.css('bottom', '48px');
                        } else if ($desertJeffLeft > 786 && $desertJeffLeft < 799) {
                            $desertJeff.css('bottom', '45px');
                        } else if ($desertJeffLeft > 798 && $desertJeffLeft < 823) {
                            $desertJeff.css('bottom', '42px');
                        } else if ($desertJeffLeft > 822 && $desertJeffLeft < 847) {
                            $desertJeff.css('bottom', '39px');
                        } else if ($desertJeffLeft > 846 && $desertJeffLeft < 871) {
                            $desertJeff.css('bottom', '36px');
                        } else if ($desertJeffLeft > 870 && $desertJeffLeft < 895) {
                            $desertJeff.css('bottom', '33px');
                        } else if ($desertJeffLeft > 894 && $desertJeffLeft < 919) {
                            $desertJeff.css('bottom', '30px');
                        } else if ($desertJeffLeft > 918 && $desertJeffLeft < 943) {
                            $desertJeff.css('bottom', '27px');
                        } else if ($desertJeffLeft > 942 && $desertJeffLeft < 967) {
                            $desertJeff.css('bottom', '24px');
                        } else if ($desertJeffLeft > 966 && $desertJeffLeft < 1015) {
                            $desertJeff.css('bottom', '21px');
                        } else if ($desertJeffLeft > 1014 && $desertJeffLeft < 1123) {
                            $desertJeff.css('bottom', '24px');
                        } else if ($desertJeffLeft > 1121 && $desertJeffLeft < 1135) {
                            $desertJeff.css('bottom', '27px');
                        } else if ($desertJeffLeft > 1134 && $desertJeffLeft < 1147) {
                            $desertJeff.css('bottom', '30px');
                        } else if ($desertJeffLeft > 1145 && $desertJeffLeft < 1159) {
                            $desertJeff.css('bottom', '33px');
                        } else if ($desertJeffLeft > 1158 && $desertJeffLeft < 1171) {
                            $desertJeff.css('bottom', '36px');
                        } else if ($desertJeffLeft > 1170 && $desertJeffLeft < 1183) {
                            $desertJeff.css('bottom', '39px');
                        } else if ($desertJeffLeft > 1182 && $desertJeffLeft < 1195) {
                            $desertJeff.css('bottom', '36px');

                            // 第三個沙丘開始
                        } else if ($desertJeffLeft > 1194 && $desertJeffLeft < 1207) {
                            $desertJeff.css('bottom', '33px');
                        } else if ($desertJeffLeft > 1362 && $desertJeffLeft < 1567) {
                            $desertJeff.css('bottom', '27px');
                        } else if ($desertJeffLeft > 1566 && $desertJeffLeft < 1615) {
                            $desertJeff.css('bottom', '24px');
                        } else if ($desertJeffLeft > 1614 && $desertJeffLeft < 1664) {
                            $desertJeff.css('bottom', '24px');
                        } else if ($desertJeffLeft > 1663 && $desertJeffLeft < 1674) {
                            $desertJeff.css('bottom', '21px');
                        } else if ($desertJeffLeft > 1673 && $desertJeffLeft < 1747) {
                            $desertJeff.css('bottom', '15px');
                        } else {
                            $desertJeff.css('bottom', '30px');
                        }
                    }

                    // Jeff draw water
                    if (desertKeyID === 'Space') {
                        // console.log('Spacebar');
                        if ($desertJeffLeft > 1493 && $desertJeffLeft < 1627) {
                            $desertJeff.css({'-webkit-transform':'rotateY(0deg)','-moz-transform':'rotateY(0deg)','-ms-transform':'rotateY(0deg)','transform':'rotateY(0deg)'});
                            $desertJeff.css('background-image', 'none');
                            $desertJeff.css('left', '1521px');
                            $desert_Jeff_drawWater.css('background-image', 'url(assets/img/scene-desert_drawWater.gif');

                            //well gif
                            setTimeout(() => {
                                $('#desert_well').addClass('drawUp');
                            }, 700);

                            drawWater();
                        }
                    }
                },
                false
            );

            // 移除走路 gif
            window.addEventListener(
                'keyup',
                function (e) {
                    var desertKeyupID = e.code;
                    if (!desertKeyupID === 'Space') {
                        $desertJeff.css('background-image', 'url(assets/img/scene-desert_man.gif)');
                    }
                },
                false
            );
        });

        function drawWater() {
            //移除draw water gif
            setTimeout(() => {
                $('#desert_Jeff_drawWater').addClass('drawUp');
                $('#desert_well').addClass('drawDone');
            }, 5700);

            setTimeout(() => {
                wellShow();
            }, 6700);
        }

        // well puzzle
        function wellShow() {
            $('#frame_desert #bucket_puzzle01').addClass('now');
            $('#well_bg').fadeIn();

            $('#frame_desert #well_bg , #frame_desert #success').css('left', Math.abs($desertPos));
            $('#frame_desert #well_bucket').css('left', Math.abs($desertPos) + 184);
            $('#frame_desert #well_bucket .fontSize_28').css('left', Math.abs($desertPos) + 260);

            // 桶子上提
            setTimeout(() => {
                $('#frame_desert #well_bucket').addClass('show');
                $('#frame_desert .fontSize_28').addClass('show');
            }, 1500);

            setTimeout(() => {
                $('#frame_desert #bucket_click').fadeIn();
            }, 3500);
        }


        // 判別element rotate 角度
        function getCurrentRotation( elementId ) {
            // console.log(el);
            var el = document.getElementById("puzzle0"+elementId);
            var st = window.getComputedStyle(el, null);
            var tr = st.getPropertyValue("-webkit-transform") ||
                 st.getPropertyValue("-moz-transform") ||
                 st.getPropertyValue("-ms-transform") ||
                 st.getPropertyValue("-o-transform") ||
                 st.getPropertyValue("transform") ||
                 "fail...";
          
            if( tr !== "none") {
                // console.log('Matrix: ' + tr);
            
                var values = tr.split('(')[1];
                    values = values.split(')')[0];
                    values = values.split(',');
                var a = values[0];
                var b = values[1];
                var radians = Math.atan2(b, a);
                if ( radians < 0 ) {
                    radians += (2 * Math.PI);
                }
                var rotateAngle = Math.round( radians * (180/Math.PI));
                
            } else {
                var rotateAngle = 0;
            }
          
            // console.log('Rotate: ' + rotateAngle + 'deg');
            return rotateAngle;
        }

        // 點擊puzzle旋轉
        $('#well_bucket i[id^="puzzle"]').click(function () {
            $('#frame_desert #bucket_click').fadeOut();
            
            // 字串處理 puzzle01_1 > 1_1
            var elString = $(this).attr('id');
            var finalElString = elString.split("puzzle0",2);
            // console.log("finalElString[1]:",finalElString[1]);

            // let rotateAngle = $(this).css('transform');
            let rotateAngle = getCurrentRotation(finalElString[1]);
            
            // console.log("be: ",rotateAngle);

            if (rotateAngle == 0) {
                //0deg
                $(this).css({
                    "-webkit-transition":  'all 0s',
                    "-moz-transition":  'all 0s',
                    "-o-transition":  'all 0s',
                    "transition": 'all 0s',
                    "-webkit-transform": 'rotate(-360deg)',
                    "-moz-transform": 'rotate(-360deg)',
                    "-ms-transform": 'rotate(-360deg)',
                    "-o-transform": 'rotate(-360deg)',
                    "transform": 'rotate(-360deg)',
                });

                // 度數由-270deg轉至0deg時會逆著轉，故調整transition，並最小限度的延遲讓程式生效
                setTimeout(() => {
                    $(this).css({
                        "-webkit-transition": 'all 0.2s ease-out',
                        "-moz-transition": 'all 0.2s ease-out',
                        "-o-transition": 'all 0.2s ease-out',
                        'transition': 'all 0.2s ease-out'
                    });
                    $(this).css({
                        "-webkit-transform":  'rotate(-270deg)',
                        "-moz-transform": 'rotate(-270deg)',
                        "-ms-transform": 'rotate(-270deg)',
                        "-o-transform": 'rotate(-270deg)',
                        'transform': 'rotate(-270deg)',
                    });
                }, 1);

                rotateAngle = $(this).css('transform');
            } else if (rotateAngle == -90 || rotateAngle == 270) {
                //-90deg
                $(this).css({
                    "-webkit-transform": 'rotate(0deg)',
                    "-moz-transform":'rotate(0deg)',
                    "-ms-transform":'rotate(0deg)',
                    "-o-transform": 'rotate(0deg)',
                    'transform': 'rotate(0deg)',
                });
                rotateAngle = $(this).css('transform');
            } else if (rotateAngle == 180 || rotateAngle == -180) {
                //-180deg
                $(this).css({
                    "-webkit-transform": 'rotate(-90deg)',
                    "-moz-transform":'rotate(-90deg)',
                    "-ms-transform":'rotate(-90deg)',
                    "-o-transform":'rotate(-90deg)',
                    'transform': 'rotate(-90deg)',
                });
                rotateAngle = $(this).css('transform');
            } else if (rotateAngle == 90 ||rotateAngle == -270) {
                //-270deg
                $(this).css({
                    "-webkit-transform":  'rotate(-180deg)',
                    "-moz-transform": 'rotate(-180deg)',
                    "-ms-transform": 'rotate(-180deg)',
                    "-o-transform": 'rotate(-180deg)',
                    'transform': 'rotate(-180deg)',
                });
                rotateAngle = $(this).css('transform');
            } else {
                // console.log('X(');
            }

            // console.log("af: ",rotateAngle);

            // 過快exam會造成吐出值有誤
            setTimeout(() => {
                puzzleExam();
            }, 1000);
        });

        // 角度驗證
        function puzzleExam() {
            if ($('#frame_desert #bucket_puzzle01').hasClass('now')) {
                // puzzle01
                if ($('#puzzle01_2').css('transform') == 'matrix(1, 0, 0, 1, 0, 0)') {
                    puzzleExamCorrect();
                }
            } else if ($('#frame_desert #bucket_puzzle02').hasClass('now')) {
                // puzzle02

                var $puzzle02Num = 0;
                $('#frame_desert #bucket_puzzle02 i').each(function () {
                    if ($(this).css('transform') == 'matrix(1, 0, 0, 1, 0, 0)') {
                        $puzzle02Num++;
                        // console.log('$puzzle02Num: ', $puzzle02Num);
                    }
                });
                if ($puzzle02Num == 12) {
                    puzzleExamCorrect();
                } else {
                    // console.log('error :(');
                }
            } else {
                // puzzle03

                var $puzzle03Num = 0;
                $('#frame_desert #bucket_puzzle03 i').each(function () {
                    if ($(this).css('transform') == 'matrix(1, 0, 0, 1, 0, 0)') {
                        $puzzle03Num++;
                        // console.log('$puzzle03Num: ', $puzzle03Num);
                    }
                });
                if ($puzzle03Num == 35) {
                    puzzleExamCorrect();
                } else {
                    // console.log('error :(');
                }
            }
        }

        // 角度驗證正確
        function puzzleExamCorrect() {

            if ($('#frame_desert #bucket_puzzle01').hasClass('now') == true) {
                // puzzle01
                $('#well_bucket #bucket_puzzle01 i').css('pointer-events', 'none');
                $('#frame_desert #puzzle01_glow').addClass('show');

                setTimeout(() => {
                    $('#frame_desert #bucket_puzzle01 i').fadeOut();
                }, 510);

                setTimeout(() => {
                    $('#frame_desert #puzzle01_glow').addClass('get');
                    $('#frame_desert #blank_Geobacter:nth-child(1)').addClass('show');
                }, 1500);

                setTimeout(() => {
                    $('#frame_desert #bucket_puzzle01').removeClass('now');
                }, 2500);

                // 切換成puzzle02
                setTimeout(() => {
                    $('#frame_desert #well_bucket').removeClass('show');
                }, 3000);

                setTimeout(() => {
                    $('#frame_desert #bucket_puzzle02').addClass('now');
                    $('#frame_desert #well_bucket').addClass('show');
                }, 4300);
            } else if ($('#frame_desert #bucket_puzzle02').hasClass('now') == true) {
                // puzzle02
                // console.log("puzzle02 now");
                $('#well_bucket #bucket_puzzle02 i').css('pointer-events', 'none');
                $('#frame_desert #puzzle02_glow').addClass('show');

                setTimeout(() => {
                    $('#frame_desert #bucket_puzzle02 i').fadeOut();
                }, 510);

                setTimeout(() => {
                    $('#frame_desert #puzzle02_glow').addClass('get');
                    $('#frame_desert #blank_Geobacter:nth-child(2) , #frame_desert #blank_Geobacter:nth-child(3)').addClass('show');
                }, 1500);

                setTimeout(() => {
                    $('#frame_desert #bucket_puzzle02').removeClass('now');
                }, 2500);

                // 切換成puzzle03
                setTimeout(() => {
                    $('#frame_desert #well_bucket').removeClass('show');
                }, 3000);

                setTimeout(() => {
                    $('#frame_desert #bucket_puzzle03').addClass('now');
                    $('#frame_desert #well_bucket').addClass('show');
                }, 4300);
            } else {
                // puzzle03
                // console.log("puzzle03 now");
                $('#well_bucket #bucket_puzzle03 i').css('pointer-events', 'none');
                $('#frame_desert #puzzle03_glow').addClass('show');

                setTimeout(() => {
                    $('#frame_desert #bucket_puzzle03 i').fadeOut();
                }, 510);

                setTimeout(() => {
                    $('#frame_desert #puzzle03_glow').addClass('get');
                    $('#frame_desert #blank_Geobacter:nth-child(4) , #frame_desert #blank_Geobacter:nth-child(5) , #frame_desert #blank_Geobacter:nth-child(6) , #frame_desert #blank_Geobacter:nth-child(7)'
                    ).addClass('show');
                }, 1500);

                setTimeout(() => {
                    $('#frame_desert #well_bucket .fontSize_28').css('transition', 'all 1.5s ease-out');
                    $('#frame_desert #bucket_puzzle03').removeClass('now');
                }, 2500);

                desertEnding();
            }
        }

        // 抓取成功 animation
        function desertEnding() {
            // 移除鍵盤控制
            window.removeEventListener('keydown', function () {
                // console.log('removeEventListener keydown FAIL');
            });

            // $("#game_lightbox #bag").addClass("gotDesertWorm");
            // $gotDesertWorm = 1;
            if ($('.bag_space.L').hasClass('gotSeaWorm') == true) {
                $('.bag_space.R').addClass('gotDesertWorm');
            } else {
                $('.bag_space.L').addClass('gotDesertWorm');
            }

            //元素顯示
            setTimeout(function () {
                $('#frame_desert #success').fadeIn();
                $('#frame_desert #well_bucket .fontSize_28').css('top', '-120px');
            }, 2500);

            //capsule顯示
            setTimeout(function () {
                $('#frame_desert #capsule_top , #frame_desert #capsule_hole , #frame_desert #capsule_bottom').addClass('show');
            }, 4500);

            //膠囊闔起
            setTimeout(function () {
                $('#frame_desert #capsule_top , #frame_desert #capsule_hole , #frame_desert #capsule_bottom').addClass('close');
            }, 5300);

            //膠囊上升＋字、按鈕（回家or前往下個地點）顯示
            setTimeout(function () {
                $('#frame_desert #capsule').addClass('float');
                $('#frame_desert #text').addClass('show');
                $('#frame_desert #success_btn').addClass('show');
            }, 6500);
        }

        // capsule放進包包 animation
        $('#frame_desert #success_btn').click(function () {
            $(this).fadeOut();
            $('#frame_desert #text').removeClass('show');
            $('#frame_desert #success_bg').addClass('hide');
            $('#frame_desert #capsule').addClass('shrink');
            $('#frame_btnBtm .btn_bagOpen').addClass('open');

            //移除包包打開gif
            setTimeout(function () {
                $('#frame_btnBtm .btn_bagOpen').removeClass('open');
            }, 1810);

            setTimeout(function () {
                $('#map #map_text').text('Where do you want to go next?');
                $('#map #map_text_bg').show();
                $('#map #map_btn_y , #map #map_btn_n').hide();

                // 自動開啟地圖
                $('.c_showLightbox').removeClass('c_showLightbox mapShow bagShow lightFrameShow');
                $('#game_lightbox').addClass('c_showLightbox mapShow');
            }, 2210);

            setTimeout(function () {
                $('#frame_desert #success').fadeOut();
            }, 2510);

            setTimeout(function () {
                // 移除 Map Desert
                $('#map').addClass('dsertFin');
                checkGotBothworms();

            }, 4510);
        });
    }

    ////////////   ＤＥＳＥＲＴ end   /////////////////////
    ////////////   ＥＮＤＩＮＧ   /////////////////////////
    function finalEnding() {
        // console.log("finalEnding");
        $('.btn_bag').removeClass('jump');
        $('#frame_btnBtm , #frame_btnTop').animate({ right: '-70px' });

        setTimeout(function () {
            $('#FinalEnding').show();
            $('#game_frame').css('background-color', '#1d2023');
        }, 1000);

        setTimeout(function () {
            $('#FinalEnding').css('background-image', 'url(assets/img/scene-finalEnding.svg)');
            $('#frame_home').remove();
        }, 24300);
        $('#frame_volcano , #frame_desert , #game_lightbox').remove();

        // 感謝名單
        setTimeout(function () {
            $('#FinalEnding').addClass('scrollUp');
            $('#Credits').addClass('scrollUp');
        }, 26300);

        $('#Credits #restart').click(function () {
            location.reload(true);
        });
    }
    ////////////   ＥＮＤＩＮＧ end   /////////////////////
}

jQuery(document).ready(init());

///////////////  test  //////////////////////////
// 跳過前導動畫，直接到家裡
// $('#game_menu , #frame_doctors').remove();
// $('#frame_home').addClass("begining");
// $('#frame_btnBtm').removeClass('hide');

// 到達沙漠後跳過前導動畫，直接到拼圖
// $('#well_bg').fadeIn();
// // 桶子上提
// setTimeout(() => {
//     $('#frame_desert #well_bucket').addClass('show');
//     $('#frame_desert .fontSize_28').addClass('show');
// }, 1500);

// setTimeout(() => {
//     $('#frame_desert #bucket_click').fadeIn();
// }, 3500);

//  seaVolcano 抓取測試
// $('#game_menu , #frame_doctors').remove();
// $('#frame_volcano').addClass('open');
// $('.c_frameNow').removeClass('c_frameNow');
// $('#frame_volcano').addClass('c_frameNow');
// volcanoSTART();


///////////////  test  //////////////////////////
