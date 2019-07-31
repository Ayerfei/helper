function getHotSearchData() {

    function Data(text, link) {
        this.text = text;
        this.link = link;
    }

    return [

        new Data("如何使用Mock API？",'https://help.eolinker.com/#/question/?groupID=c-110&productID=13'),

        new Data('开源版？','https://help.eolinker.com/#/question/?groupID=c-132&productID=13'),

        new Data('私有云如何收费？','https://help.eolinker.com/#/question/?groupID=c-84&productID=13'),

        new Data('怎么购买？','https://help.eolinker.com/#/question/?groupID=c-85&productID=13'),

        new Data('导入失败？','https://help.eolinker.com/#/question/?groupID=c-108&productID=13'),

        new Data('网关前面还需要配负载均衡吗','https://help.eolinker.com/#/question/?groupID=c-124&productID=14')

    ]

}