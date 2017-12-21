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
        .then(response => {
          this.translate = {
            key: '',
            english: '',
          };

          this.notify({ text: "Success!", duration: 2000 });
        })
        .catch(err => console.log('oops', err));
    },

    fetchTranslations() {
      if (this.translate.key != null && this.translate.key !== "") {
        this.translate.english = "";
        
        TranslateService.fetchTranslations(this.translate.key)
          .then(translations => {
            if (translations.length === 0) {
                this.notify({ text: "Missing German translation. Reload site in browser!", duration: 2000 });
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
          .catch(err => console.log('oops', err));
      } else if (this.translate.english != null && this.translate.english !== "") {
        console.log("TODO");
      }
    },

    notify(options) {
      if (options.duration === null || options.duration === undefined) {
        options.duration = 0;
      }

      var message = "";
      if (options.text != null) {
        message = this.$createElement(
          'span',
          {
            style: 'color: #525252; font-weight: 500;'
          },
          options.text
        );
      }

      this.$notify({
        title: options.title,
        message: message,
        duration: options.duration,
      });
    },
  }
}
</script>

<style scoped>

</style>
