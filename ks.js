const { AutojsUtil } = require("./autojsUtil");

const KS = {
    name: "快手",
    intoSearch: function () {
        log("搜索tab")
        AutojsUtil.clickSelectorWithAutoRefresh(
            id('search_btn').visibleToUser(true),
            "搜索tab",
            8,
            this.name
        );
    },
    inputKeyWord: function (keyWord) {
        let ele = AutojsUtil.getEleBySelectorWithAutoRefresh(
            id("editor").visibleToUser(true),
            "搜索输入框",
            8,
            this.name
        );
        if (ele) {
            log("输入关键字 %s", keyWord);
            ele.setText(keyWord);
        }
    }, search: function () {
        AutojsUtil.clickSelectorWithAutoRefresh(
            id('right_button').visibleToUser(true),
            "搜索",
            8,
            this.name
        );
    },
    filterTab: function () {
        log("筛选tab");
        AutojsUtil.clickSelectorWithAutoRefresh(
            id('tab_filter_image').visibleToUser(true),
            "筛选tab",
            8,
            this.name
        );
    },
    filterMostStar: function () {
        AutojsUtil.clickSelectorWithAutoRefresh(
            text("点赞最多").visibleToUser(true),
            "筛选most star",
            8,
            this.name
        );


    },
    closeFitlerTab: function () {
        log("关闭过滤")
        AutojsUtil.clickSelectorWithAutoRefresh(
            id("confirm_btn").visibleToUser(true),
            "确定",
            8,
            this.name
        );
    },
    video: function () {
        AutojsUtil.clickSelectorWithAutoRefresh(
            id("subject_op_title_newfeed").visibleToUser(true),
            "进视频",
            8,
            this.name
        );
    },
    commentTab: function () {

        AutojsUtil.clickSelectorWithAutoRefresh(
            id("comment_icon").visibleToUser(true),
            "评论Tab",
            8,
            this.name
        );
    },
    getHotComment: function () {
        // 置顶不好处理，
        // 作者也不好排除
        // 那么使用点赞量，来决定，哪个评论更有价值
        let likeEls = id("tv_like_count").find()
        let maxCountLikeEle
        let maxCount = 0
        for (let e of likeEls) {
            if (parseInt(e.getText()) > maxCount) {
                maxCount = parseInt(e.getText())
                maxCountLikeEle = e
            }
        }

        let hotComment = maxCountLikeEle.parent().parent().parent().findOne(id('comment')).getText()
        log('热评->', hotComment)
        return hotComment;
    }, closeCommentTab: function () {
        AutojsUtil.clickSelectorWithAutoRefresh(
            id("tabs_panel_close").visibleToUser(true),
            "关闭评论Tab",
            8,
            this.name
        );
    }, comment: function (comment) {

        AutojsUtil.clickSelectorWithAutoRefresh(
            id("editor_holder_text").visibleToUser(true),
            "点击评论框",
            8,
            this.name
        );

        let ele = AutojsUtil.getEleBySelectorWithAutoRefresh(
            id("editor").visibleToUser(true),
            "评论输入框",
            8,
            this.name
        );

        log("设置评论 %s", comment)
        ele.setText(comment)

        sleep(500)


        AutojsUtil.clickSelectorWithAutoRefresh(
            id("finish_button").visibleToUser(true),
            "发送",
            8,
            this.name
        );

    },
    clickSearchInVedio: function () {

        ele = AutojsUtil.clickSelectorWithAutoRefresh(
            id("search_button").visibleToUser(true),
            "搜索",
            8,
            this.name
        );

    },
    getBlankCloseXY: function () {
        // 什么都不做，补充环境
        // 抖音的需要，快手的不要
    }
}

// KS.comment(KS.getHotComment())
// KS.filterTab();
// KS.filterMostStar();
// KS.intoVedio();
// KS.commentTab();
// KS.getHotComment();
// KS.closeCommentTab();
// KS.clickSearchInVedio();

// module.exports = {
//     KS
// }