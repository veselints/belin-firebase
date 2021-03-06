   var planningPublications = [{
        id: 4,
        title: 'Градските обществени пространства - за хората и от хората',
        edition: 'в. Строителство градът, 07.07.2014',
        abstract: 'Градските обществени пространства са всички видове отворени пространства за общо ползване в съчетание с облика на обкръжаващите ги сгради. Това са булеварди, улици, площади, паркове, вътрешноквартални пространства, пешеходни зони, зони за спорт и отдих, подземни пространства - подлези, метро, предгарови площади и др.',
        url: 'http://gradat.bg/proekti_i_stanovishta/2014/07/07/2338459_gradskite_obshtestveni_prostranstva_-_za_horata_i_ot/'
    },{
        id: 5,
        title: 'Основните тематични области за развитие на публичните пространства',
        edition: 'в. Строителство градът, 07.07.2014',
        abstract: 'Публично пространство, промени в символиката на публичното пространство, място и идентичност, публичното пространство като предпоставка и ресурс за социална промяна',
        url: 'http://gradat.bg/news/2014/07/07/2338464_osnovnite_tematichni_oblasti_za_razvitie_na/'
    },{
        id: 8,
        title: 'Градовете протягат ръце към няколко европейски милиона за нови проекти',
        edition: 'в. Строителство градът, 04.07.2011',
        abstract: 'Разходете се от Борисовата градина, през Орлов мост, покрай паметника на руската армия. Оттам лесно можете да прескочите към площада на Народното събрание, от него - към Народната библиотека и Докторската градина или в обратната посока - към катедрала "Свети Александър Невски", зад Военния клуб или надолу по ул. "Раковски" до градинката на "Кристал" и после към площад "Славейков" и ул. "Граф Игнатиев".',
        url: 'http://gradat.bg/news/2011/07/04/1117155_gradovete_protiagat_ruce_kum_niakolko_evropeiski/'
    },{
        id: 9,
        title: 'Устойчивите градове генерират проспериращи общества',
        edition: 'в. Строителство градът, 07.03.2011',
        abstract: 'Санирането на съществуващите сгради и новото зелено строителство не могат да постигнат желания от обществото ефект, ако не се планират и изграждат в общия контекст на интегрираното възстановяване на градската среда',
        url: 'http://gradat.bg/forumgradat/2011/03/07/1054263_ustoichivite_gradove_generirat_prosperirashti/'
    }];
   
   var result = {}; 
   for (var i = 0; i < planningPublications.length; i ++) {
     var item = planningPublications[i]; 
     var newItem = { 
       title: item.title,
       edition: item.edition,
       abstract: item.abstract,
       coauthor: item.coauthor,
       section: 'development',
       url: item.url,
       orderId: i + 1
     }
     
     //var itemNameArray = item.fileName.split('_');
     //var itemNameEnding = itemNameArray[2].split('.')[0];
     //var itemName = itemNameArray[1] + '_' + itemNameEnding;
     
     result['Test_' + i] = newItem;
   }
   
   console.log(JSON.stringify(result));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
   var result = {};
    
    for (var i = 0; i < list.length; i ++) {
      var fileName = list[i];
      var name = fileName.slice(0, -4);
      
      var newObject = {
        fileName: fileName,
        title: name
      };
      
      result[name] = newObject;
    }
    
    console.log(JSON.stringify(result));