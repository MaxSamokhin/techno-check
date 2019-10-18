import React from "react";
import classnames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import Tooltip from "@material-ui/core/Tooltip";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Muted from "components/Typography/Muted.jsx";
import reviewCardByQuestionStyle from "assets/jss/material-dashboard-react/views/reviewCardByQuestionStyle.jsx";
import connect from "react-redux/es/connect/connect";
import { getQuestionByUser } from "../../redux/question/question.action";
import { exportDataInBackEnd, resetData, saveDataInBack } from "../../redux/manipulation-data/manipulation-data.action";
import { GROUP_BY_USER } from "../../redux/grouping/grouping.constant";

class ReviewCardByUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      questionByUser: null,
      isShowPersonalData: false
    };
  }

  componentDidMount() {
    const { getQuestionByUser } = this.props;

    getQuestionByUser();
  }

  componentDidUpdate(prevProps) {
    if (this.props.questionByUser !== prevProps.questionByUser) {

      const { questionByUser } = this.props || null;

      this.setState({ questionByUser: questionByUser });
    }

    if (this.props.groupByUser === true &&
      this.props.exportData === true &&
      this.props.exportData !== prevProps.exportData) {
      const { resetData, exportDataInBackEnd } = this.props;
      const { questionByUser } = this.state;

      console.log("export data");
      console.log(questionByUser);
      exportDataInBackEnd(questionByUser, GROUP_BY_USER);

      resetData();
    }

    if (this.props.groupByUser === true &&
      this.props.saveData === true &&
      this.props.saveData !== prevProps.saveData) {
      const { resetData, saveDataInBack } = this.props;
      const { questionByUser } = this.state;

      console.log("save data");
      saveDataInBack(questionByUser, GROUP_BY_USER);

      resetData();
    }

    if (this.props.isShowPersonalData !== prevProps.isShowPersonalData) {
      this.setState((state) => {
        return {
          ...state,
          isShowPersonalData: this.props.isShowPersonalData
        };
      });
    }
  }

  handleChangeComment = ([index, indexAnswer], e) => {
    const comment = e.target.value;
    const { questionByUser } = this.state;

    let newQuestionByUser = questionByUser;
    newQuestionByUser[index].answers[indexAnswer].comment = comment;

    this.setState({ questionByUser: newQuestionByUser });
  };

  handleChangeScore = ([index, indexAnswer, score], e) => {
    let { questionByUser } = this.state;
    let newQuestionByUser = questionByUser;

    newQuestionByUser[index].answers[indexAnswer].score = score >= 0 ? score : e.target.value;

    this.setState({ questionByUser: newQuestionByUser });
  };

  handleOpen = ([index]) => {
    let { questionByUser } = this.state;
    let newQuestionByUser = questionByUser;
    newQuestionByUser[index].open = !questionByUser[index].open;

    this.setState({ questionByUser: newQuestionByUser });
  };

  render() {
    const { classes } = this.props;
    const { questionByUser, isShowPersonalData } = this.state;

    console.log(questionByUser);

    return (<React.Fragment>
      {questionByUser && questionByUser.map((userData, index) => (
        <Card className={classnames({ [classes.cardHidden]: !userData.open })} key={index}>
          <CardHeader color='primary' onClick={this.handleOpen.bind(this, [index])}>
            <GridContainer>
              <GridItem xs={12} md={3}>
                <Tooltip title='Учитываются только текстовые вопросы'>
                  <h6 className={classnames(classes.cardTitleWhite, classes.zeroMargin)}>
                    Оценено вопросов: 3/10 <br/>
                    Общий балл: 30/100
                  </h6>
                </Tooltip>
              </GridItem>
              <GridItem xs={12} md={9}>
                { isShowPersonalData &&
                  <React.Fragment>
                    <h3 className={classnames(classes.cardTitleWhite, classes.zeroMargin)}>{userData.surname}</h3>
                    <h4 className={classnames(classes.cardTitleWhite, classes.zeroMargin)}>{userData.name}</h4>
                  </React.Fragment>
                }
              </GridItem>

              <GridItem xs={12}>
                <GridContainer align='center' alignItems='center' justify='center'>
                  <GridItem xs={12}>
                    <ExpandMoreIcon
                      className={classnames(classes.expand, {
                        [classes.expandOpen]: userData.open
                      })}
                      onClick={this.handleExpandClick}
                      aria-expanded={this.state.expanded}
                      aria-label='Show more'
                    />
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </CardHeader>

          <Collapse in={userData.open}>
            <CardBody>
              {userData.answers.map((answer, indexAnswer) => (
                <React.Fragment key={indexAnswer}>
                  <div className={classes.margin}>
                    <GridContainer spacing={8} alignItems='flex-end'>
                      <GridItem xs={12}>
                        <GridContainer alignItems='flex-start'>
                          <GridItem xs={1}>
                            <Muted> Вопрос: </Muted>
                          </GridItem>

                          <GridItem xs={11}>
                            <h5 className={classes.zeroMargin}> {answer.questionTitle}</h5>
                            <p>{answer.questionBody}</p>
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                      <GridItem xs={12}>
                        <GridContainer alignItems='flex-start'>
                          <GridItem xs={1}>
                            <Muted> Ответ: </Muted>
                          </GridItem>

                          <GridItem xs={11}>
                            <p className={classes.zeroMargin}>{answer.answer}</p>
                          </GridItem>
                        </GridContainer>
                      </GridItem>

                      <GridItem xs={2}>
                        <Button
                          fullWidth
                          color='info'
                          onClick={this.handleChangeScore.bind(this, [index, indexAnswer, 0])}
                        >
                          Не верно
                        </Button>
                      </GridItem>

                      <GridItem xs={2}>
                        <Button
                          fullWidth
                          color='primary'
                          onClick={this.handleChangeScore.bind(this, [index, indexAnswer, 10])}
                        >
                          Верно
                        </Button>
                      </GridItem>

                      <GridItem xs={1}>
                        <TextField
                          label='Балл'
                          value={answer.score}
                          type='number'
                          onChange={this.handleChangeScore.bind(this, [index, indexAnswer, null])}
                          helperText={`из 10`}
                          inputProps={{ min: "0", max: "10", step: "1" }}
                        />
                      </GridItem>

                      <GridItem xs={3}>
                        <Muted>
                          Последняя оценка: <br/>
                          {answer.lastReviewEmail} <br/>
                          {answer.lastReviewDate}
                        </Muted>
                      </GridItem>

                      <GridItem xs={4}>
                        <TextField
                          label='Комментарий'
                          fullWidth
                          multiline
                          value={answer.comment}
                          onChange={this.handleChangeComment.bind(this, [index, indexAnswer])}
                        />
                      </GridItem>
                    </GridContainer>
                  </div>
                  {userData.answers.length - 1 !== indexAnswer && <Divider/>}
                </React.Fragment>
              ))
              }
            </CardBody>
          </Collapse>
        </Card>
      ))
      }
    </React.Fragment>);
  }
}

function mapStateToProps(state) {
  return {
    groupByUser: state.grouping.groupByUser,
    questionByUser: state.questions.questionByUser,
    saveData: state.manipulation.saveData,
    exportData: state.manipulation.exportData,
    isShowPersonalData: state.personalData.isShowPersonalData
  };
}

const mapDispatchToProps = (dispatch) => ({
  getQuestionByUser: () => dispatch(getQuestionByUser()),
  resetData: () => dispatch(resetData()),
  exportDataInBackEnd: (data, typePage) => dispatch(exportDataInBackEnd(data, typePage)),
  saveDataInBack: (data, typePage) => dispatch(saveDataInBack(data, typePage))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(reviewCardByQuestionStyle)(ReviewCardByUser));
