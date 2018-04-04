/*/////////流程定义///////////
          start
           / \
          1   \
         / \   \
        4   5  2
         \ /  /
           \ /
            3
            |
           end
测试流程如上图所示
/////////////////////////////*/
var workflowDef = {
  start:{
      fn:"begin", //对应处理方法可以在内部定义，也可以在外部定义
      next:["task1","task2"]
  },
  end:"end",
  tasks:[{
      id:"task1",
      fn:function(){
        console.log("执行任务一");
      },
      before:function(){
        console.log("执行任务一前");
      },
      after:function(){
        console.log("执行任务一后");
      },
      next:["task4","task5"]
  },{
      id:"task2",
      fn:function(){
        console.log("执行任务二");
      },
      before:function(){
        console.log("执行任务二前");
      },
      after:function(){
        console.log("执行任务二后");
      },
      next:["task3"]
  },{
      id:"task3",
      fn:function(){
        console.log("执行任务三");
      },
      before:function(){
        console.log("执行任务三前");
      },
      after:function(){
        console.log("执行任务三后");
      },
      //定义合并的数量
      merge: 3,
      next:"EOWF"
  },{
      id:"task4",
      fn:function(){
        console.log("执行任务四");
      },
      before:function(){
        console.log("执行任务四前");
      },
      after:function(){
        console.log("执行任务四后");
      },
      next:["task3"]
  },{
      id:"task5",
      fn:function(){
        console.log("执行任务五");
      },
      before:function(){
        console.log("执行任务五前");
      },
      after:function(){
        console.log("执行任务五后");
      },
      next:["task3"]
  }]
}


//////////定义引擎////////////
Yi = {};
Yi.Utils = {};

Yi.Utils.execute = function(o){
    if(typeof o != 'function')
        eval(o)();
    else
        o();
}
//工作流类
Yi.Workflow = function(workflowDef){
    this.def = workflowDef;
    this.tasks = this.def.tasks;
}
//public按照环节id查找查找
Yi.Workflow.prototype.findTask = function(taskId){
    for(var i=0;i<this.tasks.length;i++){
        if(this.tasks[i].id == taskId)
            return this.tasks[i];
    }
}
//public启动工作流
Yi.Workflow.prototype.start = function(){
    this.currentTasks = [];
    Yi.Utils.execute(this.def.start.fn);
    for(var i=0;i<this.def.start.next.length;i++){
        this.currentTasks[i] = this.findTask(this.def.start.next[i]);
        Yi.Utils.execute(this.currentTasks[i].before);
    }
}
//private
Yi.Workflow.prototype.findCurrentTaskById = function(taskId){
    for(var i=0;i<this.currentTasks.length;i++){
        if(this.currentTasks[i].id == taskId)
            return this.currentTasks[i];
    }
    return null;
}
//private
Yi.Workflow.prototype.removeFromCurrentTasks = function(task){
    var temp = [];
    for(var i=0;i<this.currentTasks.length;i++){
        if(!(this.currentTasks[i] == task))
            temp.push(this.currentTasks[i]);
    }
    this.currentTasks = temp;
    temp = null;
}
//public触发当前环节
Yi.Workflow.prototype.signal = function(taskId){
    //只处理当前活动环节
    var task = this.findCurrentTaskById(taskId);
    if(task == null){
      console.log("工作流未流转到此环节!");
        return;
    }
    //对于合并的处理
    if(task.merge != undefined){
        if(task.merge != 0){
          console.log("工作流流转条件不充分!");
            return;
        }else{
            Yi.Utils.execute(task.before);
        }
    }
    //触发当前环节
    Yi.Utils.execute(task.fn);
    //触发后动作
    Yi.Utils.execute(task.after);
    //下一步如果工作流结束
    if(task.next === "EOWF"){
        Yi.Utils.execute(this.def.end);
        delete this.currentTasks;
        return;
    }
    //遍历下一步环节
    this.removeFromCurrentTasks(task);
    for(var i=0;i<task.next.length;i++){
        var tempTask = this.findTask(task.next[i]);
        if(!tempTask.inCurrentTasks)
            this.currentTasks.push(tempTask);
        if(tempTask.merge != undefined){
            tempTask.merge--;
            tempTask.inCurrentTasks = true;
        }
        else
            Yi.Utils.execute(tempTask.before);
    }
}
//public获取当前的活动环节
Yi.Workflow.prototype.getCurrentTasks = function(){
    return this.currentTasks;
}
//public获取流程定义
Yi.Workflow.prototype.getDef = function(){
    return this.def;
}

////////应用系统///////////////
var wf = new Yi.Workflow(workflowDef);
console.log("启动工作流");
wf.start();
console.log("尝试手工执行任务3,返回工作流没有流转到这里");
wf.signal("task3");
console.log("分支开始");
console.log("手工执行任务1");
wf.signal("task1");
console.log("手工执行任务2");
wf.signal("task2");
console.log("手工执行任务4");
wf.signal("task4");
console.log("手工执行任务5");
wf.signal("task5");
console.log("手工执行任务3");
wf.signal("task3");
function begin(){
  console.log("流程开始，该函数在外部定义");
}
function end(){
  console.log("流程结束");
}
