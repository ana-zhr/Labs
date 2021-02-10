$(document).ready(function () {
    var BuyList = {};
    BuyList.list = [
        { name: "Помідори", count: 1, bought: false },
        { name: "Печиво", count: 1, bought: false },
        { name: "Сир", count: 1, bought: false }
    ]

    var zalysh ='<div id="{{zalyshId}}" class="meal"><span class="zalysh" id={{zalishName}}>{{Product}}</span><span class="num">{{prodCount}}</span></div>';
    var item_html = '<div class="row" ><div class="product"><span class="newProdAft" id={{newProdAftId}}>{{ProdAft}}</span><span contenteditable="true" spellcheck="false" class="newProd" data-name={{NP}} data-id={{IP}} id={{ProdName}} >{{Product}}</span></div><div class="count"><button class="minus" type="button" data-tooltip="зменшити" id={{IdMinBut}}>-</button><span class="number" id={{idCountOFProd}}>{{count}}</span><button class="plus" type="button" data-tooltip="збільшити" id={{IdPluBut}}>+</button></div><div class="last" id={{lastId}}><button class="Notbuy" type="button" id={{NotboughtBut}}  data-tooltip="купити товар">Не Куплено</button><button class="buy" type="button" id={{boughtBut}} data-buy-id={{DBI}} data-tooltip="купити товар">Куплене</button><button class="cross" type="button" id={{crossBut}} data-tooltip="видалити товар">x</button></div></div>';
        

    function showlist() {
        $(".appendRows").html("");
        $(".products").html("");
        $(".products2").html("");


        for (var i = 0; i < BuyList.list.length; i++) {
            var item = BuyList.list[i];
            var current_item_html = item_html
                .replace('{{count}}',item.count)
                .replace('{{Product}}',item.name)
                .replace('{{ProdName}}',item.name+i)
                .replace('{{crossBut}}',i)
                .replace('{{IdPluBut}}',i)
                .replace('{{IdMinBut}}',i)
                .replace('{{boughtBut}}','boughtBut'+i)
                .replace('{{DBI}}',i)
                .replace('{{lastId}}',i)
                .replace('{{NotboughtBut}}',i)
                .replace('{{ProdAft}}',item.name)
                .replace('{{newProdAftId}}',i)
                .replace('{{IP}}',i)
                .replace('{{NP}}',item.name);


            var curr_zalysh = zalysh
                .replace('{{Product}}',item.name)
                .replace('{{zalishName}}',i)
                .replace('{{prodCount}}',item.count);

            var curr_bought = zalysh
                .replace('{{Product}}', item.name)
                .replace('{{zalishName}}', i)
                .replace('{{prodCount}}', item.count)
                .replace('{{zalyshId}}',i)

            


            $(".appendRows").append(current_item_html);

            $('.products2').append(curr_bought);

            
            

            if(!BuyList.list[i].bought){
                $('.products').append(curr_zalysh);
            $('#'+i+'.meal').css({'display':'none'});
            }

            $("#" + i + '.plus').click(function () {
                BuyList.list[this.id].count+=1;
                showlist();
            });

            $("#" + i + '.Notbuy').click(function () {
                BuyList.list[this.id].bought = false;
                showlist();
            });

            $("#boughtBut" + i).click(function () {
                BuyList.list[$(this).attr('data-buy-id')].bought=true;
                showlist();
            });

            $("#" + i + '.minus').click(function () {
                if (BuyList.list[this.id].count > 1){
                BuyList.list[this.id].count -= 1;
                showlist();
                }
                
            });

            $('#' + item.name + i).keyup(function () {
                var value = $('#' + $(this).attr('data-name') + $(this).attr('data-id')).html();
                BuyList.list[$(this).attr("data-id")].name = value;
                $('#' + $(this).attr("data-id")+'.zalysh').html(value);
            });


            if(BuyList.list[i].bought){
                $('#'+i+'.zalysh').css({'text-decoration':'line-through'})
                $('#' + i + '.newProdAft').css({ 'display': 'inline-block' });
                $('#' + item.name + i).css({ 'display': 'none' });
                $("#" + i + '.plus').css({ 'display': 'none' });
                $("#" + i + '.minus').css({ 'display': 'none' });
                $('#'+i+'.Notbuy').css({'display':'inline-block'});
                $('#boughtBut' + i ).css({ 'display': 'none' });
                $('#' + i + '.cross').css({ 'display': 'none' })
            }
           



            $("#" + i+'.cross').click(function () {
                remove_item(this.id);
            });
        }

    }
    showlist();

    $("#btn").click(function () {
        BuyList.list.push({
            name: $("#addline").val(),
            count:1,
            bought:false
        });
        $("#addline").val("");
        showlist();
    });

    function remove_item(id) {
        BuyList.list.splice(id, 1);
        showlist();
    }
    $(document).keypress(function (e) {
        if ($('#addline').is(':focus'))
            if (e.which == 13) {
                if ($("#addline").val() != "")
                    BuyList.list.push({
                        name: $("#addline").val(),
                        count: 1,
                        bought: false
                    });
                $("#addline").val("");
                showlist();
            }
    });
});