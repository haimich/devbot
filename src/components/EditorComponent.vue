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
    <v-jsoneditor :options="options"></v-jsoneditor>
  </el-tab-pane>
</el-tabs>

</template>

<script>


export default {
    name: 'Editor',

    data() {
      return {
        activeTab: '0',
        editableTabs: [{
            title: 'New Tab',
            name: '0',
        }],
        options: {
          mode: "code",
          modes: ["code", "form"]
        }
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