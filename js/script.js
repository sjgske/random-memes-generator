var ref = [
  { key: 1, name: "셀럽" },
  { key: 2, name: "인스타" },
  { key: 3, name: "드라마" },
  { key: 4, name: "영화" },
  { key: 5, name: "예능" },
  { key: 6, name: "캐릭터" },
  { key: 7, name: "동물" },
  { key: 8, name: "애니" },
  { key: 9, name: "웹툰" },
  { key: 10, name: "케이팝" },
  { key: 11, name: "감성" },
];

var isComplete = false; //autoMaker 자식이 선택 되었는지 여부
$("#search_area").keyup(function () {
  var txt = $(this).val();
  if (txt != "") {
    //빈줄이 들어오면
    $("#autoMaker").children().remove();

    ref.forEach(function (arg) {
      if (arg.name.indexOf(txt) > -1) {
        $("#autoMaker").append(
          $("<div>").text(arg.name).attr({ key: arg.key })
        );
      }
    });
    $("#autoMaker")
      .children()
      .each(function () {
        $(this).click(function () {
          $("#search_area").val($(this).text());
          $("#autoMaker").children().remove();
          isComplete = true;
        });
      });
  } else {
    $("#autoMaker").children().remove();
  }
});

// Listing images
$(document).ready(function () {
  listing();
});

function listing() {
  $.ajax({
    type: "GET",
    url: "https://randomzzal.herokuapp.com/https://openapi.naver.com/v1/search/image",
    data: { query: "짤 모음", display: 50 },
    headers: {
      "X-Naver-Client-Id": "M0i7ZMMD6rcJT_kErnkU",
      "X-Naver-Client-Secret": "l4tflp41vy",
    },
    success: function (response) {
      let items = response["items"];
      for (let i = 0; i < items.length; i++) {
        let imgurl = items[i]["thumbnail"];

        let temp_html = `<figure class="figure">
                            <img src="${imgurl}">
                          </figure>`;
        $("#columns").append(temp_html);
      }
    },
  });
}

// Generate random images
$(document).ready(function () {
  randomzzal();
});

function randomzzal() {
  $.ajax({
    type: "GET",
    url: "https://randomzzal.herokuapp.com/https://openapi.naver.com/v1/search/image",
    data: { query: "웃긴 짤", display: 50 },
    headers: {
      "X-Naver-Client-Id": "M0i7ZMMD6rcJT_kErnkU",
      "X-Naver-Client-Secret": "l4tflp41vy",
    },
    success: function (response) {
      let items = response["items"];

      let randomNumber = Math.floor(Math.random() * 51);
      let imgurl = items[randomNumber]["thumbnail"];

      let temp_html = `<img src="${imgurl}">`;
      $(".result-image").append(temp_html);
    },
  });
}

// TODO: heart button 색깔
$(".heart-button").click(function () {
  $(this).find("svg").toggleClass("liked");
});
