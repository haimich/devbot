<template>
  <div>
    <h3 class="section-heading">Translate</h3>

    <el-row :gutter="style.gutter">

      <el-form class="translate-form" label-width="100px">
        <el-col :span="12">

          <el-form-item label="Key">
              <el-input v-model="translate.key"></el-input>
          </el-form-item>

          <el-form-item label="German">
              <el-input v-model="translate.key" disabled></el-input>
          </el-form-item>

          <el-form-item label="English">
            <el-input type="textarea" v-model="translate.english"></el-input>
          </el-form-item>

          <el-col :span="24" style="display: flex; justify-content: flex-end;">
              <el-button @click="fetchTranslations">Fetch</el-button>
              <el-button type="danger" @click="translateText">Translate</el-button>
          </el-col>

        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import TranslateService from '@/services/TranslateService';

export default {
  name: 'Translate',
  data () {
    return {
      style: {
        gutter: 12,
      },
      translate: {
        key: '',
        english: '',
      }
    }
  },
  methods: {
    translateText() {
      TranslateService.translateText(this.translate.key, this.translate.english)
        .then(() => {
          this.translate = {
            key: '',
            english: '',
          };

          this.$notify({
            message: "Success!",
          });
        })
        .catch(err => {
          this.$notify({
            message: "Error",
            type: "error",
          });
        });
    },

    fetchTranslations() {
      if (this.translate.key != null && this.translate.key !== "") {
        this.translate.english = "";
        
        TranslateService.fetchTranslations(this.translate.key)
          .then(response => {
            var translations = response.data;

            if (translations.length === 0) {
              this.$notify({
                message: "Missing German translation. Reload site in browser!",
                type: "warning",
              });                
              return;
            }

            let englishText = "";

            for (let translation of translations) {
              if (translation.lang === "en") {
                englishText = translation.text;
                break;
              }
            }

            if (englishText === "") {
              this.translate.english = "missing";
            } else {
              this.translate.english = englishText;
            }
          })
          .catch(err => {
            this.$notify({
              message: "Error",
              type: "error",
            });
          });
      } else if (this.translate.english != null && this.translate.english !== "") {
        this.$notify({
          message: "Not implemented yet",
          type: "warning",
        });
      }
    },

  }
}
</script>

<style scoped>

</style>
