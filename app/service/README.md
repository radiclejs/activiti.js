
### RepositoryService 管理流程仓库, 读取、部署、删除资源
Activiti 中每一个不同版本的业务流程的定义都需要使用一些定义文件，部署文件和支持数据 ( 例如 BPMN2.0 XML 文件，表单定义文件，流程定义图像文件等 )，这些文件都存储在 Activiti 内建的 Repository 中。Repository Service 提供了对 repository 的存取服务。

### IndentifyService 管理和查询用户、组之间的关系
Activiti 中内置了用户以及组管理的功能，必须使用这些用户和组的信息才能获取到相应的 Task。Identity Service 提供了对 Activiti 系统中的用户和组的管理功能。

### RuntimeService 处理所有正在运行时的流程实例、任务等
在 Activiti 中，每当一个流程定义被启动一次之后，都会生成一个相应的流程对象实例。Runtime Service 提供了启动流程、查询流程实例、设置获取流程实例变量等功能。此外它还提供了对流程部署，流程定义和流程实例的存取服务。

### TaskService 用于管理、查询任务
在 Activiti 中业务流程定义中的每一个执行节点被称为一个 Task，对流程中的数据存取，状态变更等操作均需要在 Task 中完成。Task Service 提供了对用户 Task 和 Form 相关的操作。它提供了运行时任务查询、领取、完成、删除以及变量设置等功能。

### FormService 管理和任务、流程相关的数据
Activiti 中的流程和状态 Task 均可以关联业务相关的数据。通过使用 Form Service 可以存取启动和完成任务所需的表单数据并且根据需要来渲染表单。

### HistoryService 查询所有历史数据: 流程实例、任务、活动、变量、附件
History Service 用于获取正在运行或已经完成的流程实例的信息，与 Runtime Service 中获取的流程信息不同，历史信息包含已经持久化存储的永久信息，并已经被针对查询优化。

### ManagementService 管理引擎数据, 和业务无关
Management Service 提供了对 Activiti 流程引擎的管理和维护功能，这些功能不在工作流驱动的应用程序中使用，主要用于 Activiti 系统的日常维护。
