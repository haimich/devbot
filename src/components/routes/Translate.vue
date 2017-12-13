<template>
  <div>
    <h3 class="section-heading">Translate</h3>

    <el-row :gutter="style.gutter">

      <el-form class="translate-form" label-width="100px">
        <el-col :span="12">

          <el-form-item label="Key">
              <el-input v-model="translate.key"></el-input>
          </el-form-item>

          <el-form-item label="Deutsch">
              <el-input v-model="translate.german" disabled></el-input>
          </el-form-item>

          <el-form-item label="Englisch">
            <el-input type="textarea" v-model="translate.english"></el-input>
          </el-form-item>

          <el-col :spam="12">
            <el-form-item>
              <el-button type="primary" @click="translateText">Übersetzen</el-button>
            </el-form-item>
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
      TranslateService.get()
        .then(response => {
          console.log('done', response);
          this.translate.english = "done";
        })
        .catch(err => console.log('oops', err));
    }
  }
}
</script>

<style scoped>

</style>
