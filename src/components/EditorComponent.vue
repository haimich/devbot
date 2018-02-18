<template>

<el-tabs
    v-model="activeTab"
    type="card"
    editable
    @edit="handleTabsEdit"
>
  <el-tab-pane
    v-for="(item, index) in editableTabs"
    :key="item.name"
    :label="item.title"
    :name="item.name"
  >
    <div ref="jsoneditor"></div>
  </el-tab-pane>
</el-tabs>

</template>

<script>

import JSONEditor from 'jsoneditor'

export default {
    name: 'Editor',

    data() {
      return {
        activeTab: '',
        editableTabs: [],
        editors: {},
      }
    },

    mounted() {
      this.handleTabsEdit(null, 'add');
    },

    updated() {
      var containers = this.$refs.jsoneditor;

      for (let i = 0; i < containers.length; i++) {
        if (this.editors[i] != null) {
          // editor already initialized for this tab
          continue;
        }

        let container = containers[i];
        var options = {
          mode: 'code',
        };
        this.editors[i] = new JSONEditor(container, options);
      }
    },

    methods: {
      handleTabsEdit(targetTab, action) {
        if (action === 'add') {
          let newTabName = this.editableTabs.length + '';

          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
          });

          this.activeTab = newTabName;
        }

        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeTab = this.activeTab;
          
          if (activeTab === targetTab) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetTab) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeTab = nextTab.name;
                }
              }
            });
          }
          
          this.activeTab = activeTab;
          this.editableTabs = tabs.filter(tab => tab.name !== targetTab);

          // remove json editor
          delete this.editors[targetTab];
        }
      }
    }
}

</script>

<style>

  .el-tabs--card {
      border: 1px solid #dcdfe6;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
      height: 600px;
  }

</style>