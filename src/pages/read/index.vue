<template>
  <div class="divider">
    <gz-divider title="pages.read.title"></gz-divider>
  </div>
  <div class="main">
    <el-input
      @input="onSelectArticle"
      class="select-bar"
      size="large"
      v-model="selectInputValue"
      :placeholder="selectPlaceholder"
    ></el-input>
    <div class="article-card" v-for="article in ArticleList">
      <gz-article-card
        :config="{
          title: article.title,
          key: article.uuid,
          description: article.description,
          time: article.createdAt,
          cover: article.cover,
          onClick: articleOnclick(article.uuid),
          onDelete: onDeleteArticle,
          onEdit: onEditArticle,
        }"
      ></gz-article-card>
    </div>
    <h1 v-if="ArticleList?.length === 0">暂无搜索内容</h1>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next,jumper"
      :total="ArticleListCount"
      @current-change="onCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted } from "vue";
import { useStore } from "@store/index";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import GzDivider from "@components/GzDivider/index.vue";
import GzArticleCard from "@components/GzArticleCard/index.vue";
import { getArticlesService, deleteArticleService } from "@service/article";
import { ElInput, ElPagination } from "element-plus";
import useChangePath from "@hooks/useChangePath";
import debounce from "@utils/debounce";
const store = useStore();
const router = useRouter();
const { t } = useI18n();
const selectInputValue = ref("");
const selectPlaceholder = ref(t("pages.read.selectBar.placeholder"));
useChangePath();
watchEffect(() => {
  store.state.modelSystem.globalControl.language;
  selectPlaceholder.value = t("pages.read.selectBar.placeholder");
});

const token = ref(store.state.modelSystem.globalControl.token);
watchEffect(() => {
  token.value = store.state.modelSystem.globalControl.token;
});
//搜索范围内的文章资料
const ArticleList = ref<
  {
    content: string;
    cover: string;
    createdAt: string;
    description: string;
    title: string;
    uuid: string;
  }[]
>();
//总数
const ArticleListCount = ref(1);
//当前页数
const pageCount = ref(1);
function getArticles(pageNumber: number, title?: string) {
  getArticlesService(pageNumber, title).then((result) => {
    if (typeof result.message !== "string" && result.message.aticles) {
      ArticleList.value = result.message.aticles;
      ArticleListCount.value = result.message.count;
    }
  });
}
onMounted(() => {
  getArticles(1);
});
const onCurrentChange = (val: number) => {
  pageCount.value = val;
  getArticles(val, selectInputValue.value);
};
const debounceSelectAticle = debounce((value: string) => {
  getArticles(1, value);
}, 500);

const onSelectArticle = (value: string) => {
  debounceSelectAticle(value);
};

const articleOnclick = (uuid: string) => {
  return () => {
    router.push({ path: "/read/" + uuid });
  };
};

const deleteLoding = ref(false);
const onDeleteArticle = (uuid: string) => {
  deleteArticleService({
    uuid,
    token: token.value,
    loading: deleteLoding,
  }).then(() => {
    getArticles(pageCount.value, selectInputValue.value);
  });
};

const onEditArticle = (uuid: string) => {
  store.commit("modelSystem/changeKeyPath", ["write"]);
  router.push({
    path: "/write",
    query: {
      uuid,
      operate: "edit",
    },
  });
};
</script>

<style lang="less" scoped>
.divider {
  margin: 60px 0;
}
.main {
  width: 80%;
  margin: 0 auto;
  .select-bar {
    margin-bottom: 20px;
  }
  .article-card {
    margin: 20px 0;
  }
  .pagination {
    margin: 40px 0;
  }
}
</style>
