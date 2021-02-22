import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Select, Spin, Button} from 'antd';
import {useQuery} from '@apollo/react-hooks';
import {GET_TASKS_BY_PRODUCT} from '../../../../graphql/queries';
import {TaskTable} from '../../../../components';
import AddTask from '../../../../components/Products/AddTask';
import LeftPanelContainer from '../../../../components/HOC/withLeftPanel';
import {useRouter} from "next/router";
import {getProp} from "../../../../utilities/filters";

const {Option} = Select;

type Props = {
  onClick?: () => void;
  currentProduct: any;
  repositories: Array<any>;
  userRole: string;
  productSlug: string;
};

const TasksPage: React.FunctionComponent<Props> = (props: Props) => {
  const router = useRouter()
  const {productSlug} = router.query

  const {currentProduct, repositories, userRole} = props;
  const [tagType, setTagType] = useState("all");
  const [sortType, setSortType] = useState("initiatives");
  const [taskType, setTaskType] = useState("all");
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const {data, error, loading, refetch} = useQuery(GET_TASKS_BY_PRODUCT, {
    variables: {productSlug, userId: userId == null ? 0 : userId}
  });

  const closeTaskModal = (flag: boolean) => {
    setShowAddTaskModal(flag);
    refetch({productSlug});
  }

  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
  }, []);

  const fetchTasks = async () => {
    await refetch({
      productSlug
    });
  }

  return (
    <LeftPanelContainer>
      <div>
        <Row>
          {(userRole === "Manager" || userRole === "Admin") && (
            <Col>
              <Button
                className="text-right add-task-btn mb-15"
                onClick={() => setShowAddTaskModal(true)}
              >
                Add Task
              </Button>
              <AddTask
                modal={showAddTaskModal}
                closeModal={closeTaskModal}
                tasks={data?.tasks}
                submit={fetchTasks}
              />
            </Col>
          )}
          <Col className="tag-section ml-auto">
            <div>
              <label className='mr-15'>Tags: </label>
              <Select
                defaultValue={tagType}
                style={{width: 120}}
                onChange={setTagType}
              >
                <Option value="all">All</Option>
                <Option value="django">Django</Option>
                <Option value="react">React</Option>
                <Option value="graphql">Graphql</Option>
              </Select>
            </div>
            <div className='ml-15'>
              <label className='mr-15'>Sorted by: </label>
              <Select
                defaultValue={sortType}
                style={{width: 120}}
                onChange={setSortType}
              >
                <Option value="initiatives">Number of initiatives</Option>
                <Option value="stroies">Number of tasks</Option>
              </Select>
            </div>
            <div className='ml-15'>
              <label className='mr-15'>Tasks: </label>
              <Select
                defaultValue={taskType}
                style={{width: 120}}
                onChange={setTaskType}
              >
                <Option value="all">All</Option>
                <Option value="django">Django</Option>
                <Option value="react">React</Option>
                <Option value="graphql">Graphql</Option>
              </Select>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        {
          loading ? (
            <Spin size="large"/>
          ) : !error ? (
            <TaskTable tasks={data.tasksByProduct} statusList={data.statusList} hideTitle={true}
                       showPendingTasks={userRole === "Manager" || userRole === "Admin"} isAdminOrManager={getProp(data, 'isAdminOrManager', false)}/>
          ) : (
            <h3 className="text-center mt-30">No tasks</h3>
          )
        }
      </div>
    </LeftPanelContainer>
  )
};

const mapStateToProps = (state: any) => ({
  user: state.user,
  currentProduct: state.work.currentProduct,
  repositories: state.work.repositories,
  userRole: state.work.userRole
});

const mapDispatchToProps = (dispatch: any) => ({});

const TasksPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksPage);

export default TasksPageContainer;
