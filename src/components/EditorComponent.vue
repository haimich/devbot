<template>

<el-tabs
    v-model="editableTabsValue"
    type="border-card"
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
        editableTabsValue: '1',
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        },],
        tabIndex: 1,
        options: {
          mode: "code",
          modes: ["code", "form"]
        }
      }
    },

    methods: {

      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      }
    }
}

</script>

<style>
</style>