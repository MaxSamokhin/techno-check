import React from "react";
import classnames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Muted from "components/Typography/Muted.jsx";
import reviewCardByQuestionStyle from "assets/jss/material-dashboard-react/views/reviewCardByQuestionStyle.jsx";
import { getQuestionByQuestion } from "../../redux/question/question.action";
import connect from "react-redux/es/connect/connect";
import { exportDataInBackEnd, resetData, saveDataInBack } from "../../redux/manipulation-data/manipulation-data.action";
import { GROUP_BY_QUESTION } from "../../redux/grouping/grouping.constant";

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      questionByQuestion: null,
      isShowPersonalData: false
    };
  }

  componentDidMount() {
    const { getQuestionByQuestion } = this.props;

    getQuestionByQuestion();
  }

  componentDidUpdate(prevProps) {
    if (this.props.questionByQuestion !== prevProps.questionByQuestion) {

      const { questionByQuestion } = this.props || null;

      this.setState({ questionByQuestion: questionByQuestion });
    }

    if (this.props.groupByQuestion === true &&
      this.props.exportData === true &&
      this.props.exportData !== prevProps.exportData) {
      const { resetData, exportDataInBackEnd } = this.props;
      const { questionByQuestion } = this.state;

      console.log("export data");
      exportDataInBackEnd(questionByQuestion, GROUP_BY_QUESTION);


      resetData();
    }

    if (this.props.groupByQuestion === true &&
      this.props.saveData === true &&
      this.props.saveData !== prevProps.saveData) {
      const { resetData, saveDataInBack } = this.props;
      const { questionByQuestion } = this.state;

      console.log("save data");
      saveDataInBack(questionByQuestion, GROUP_BY_QUESTION);

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
    const { questionByQuestion } = this.state;

    let newQuestionByQuestion = questionByQuestion;
    newQuestionByQuestion[index].user[indexAnswer].comment = comment;

    this.setState({ questionByQuestion: newQuestionByQuestion });
  };

  handleChangeScore = ([index, indexAnswer, score], e) => {
    let { questionByQuestion } = this.state;
    let newQuestionByQuestion = questionByQuestion;

    newQuestionByQuestion[index].user[indexAnswer].score = score >= 0 ? score : e.target.value;

    this.setState({ questionByQuestion: newQuestionByQuestion });
  };

  handleOpen = ([index]) => {
    let { questionByQuestion } = this.state;
    let newQuestionByQuestion = questionByQuestion;
    newQuestionByQuestion[index].open = !questionByQuestion[index].open;

    this.setState({ questionByQuestion: newQuestionByQuestion });

  };

  render() {
    const { classes } = this.props;
    const { questionByQuestion, isShowPersonalData } = this.state;

    return (
      <React.Fragment>
        {questionByQuestion && questionByQuestion.map((userQuestion, index) => (
          <Card className={classnames({ [classes.cardHidden]: !userQuestion.open })} key={index}>
            <CardHeader color='primary' onClick={this.handleOpen.bind(this, [index])}>
              <GridContainer>
                <GridItem xs={12} md={3}>
                  <h6 className={classes.zeroMargin}> Оценено вопросов: 3/{userQuestion.countQuestion} </h6>
                </GridItem>
                <GridItem xs={12} md={9}>
                  <h4 className={classes.cardTitleWhite}>{userQuestion.questionTitle}</h4>
                </GridItem>

                <GridItem xs={0} md={3}/>
                <GridItem xs={12} md={8}>
                  <p className={classes.cardCategoryWhite}>
                    {userQuestion.questionText}
                  </p>
                </GridItem>


                <GridItem xs={12}>
                  <GridContainer align='center'>
                    <GridItem xs={12}>
                      <ExpandMoreIcon
                        className={classnames(classes.expand, {
                          [classes.expandOpen]: userQuestion.open
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

            <Collapse in={userQuestion.open}>
              <CardBody>

                {userQuestion.user.map((userAnswer, indexAnswer) => (
                  <React.Fragment key={indexAnswer}>

                    <div className={classes.margin}>
                      <GridContainer spacing={8} alignItems='flex-end'>
                        <GridItem xs={4}>
                          <Muted> ID пользователя: {isShowPersonalData ? userAnswer.userId : "Отображение персональных данных отключено"} </Muted>
                        </GridItem>

                        <GridItem xs={8}/>
                        <GridItem xs={12}>
                          <GridContainer alignItems='flex-start'>
                            <GridItem xs={2}>
                              <Muted> Ответ: </Muted>
                            </GridItem>

                            <GridItem xs={10}>
                              <p>
                                {userAnswer.answer}
                              </p>
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
                            value={userAnswer.score}
                            onChange={this.handleChangeScore.bind(this, [index, indexAnswer, null])}
                            type='number'
                            helperText={`из 10`}
                            inputProps={{ min: "0", max: "10", step: "1" }}
                          />
                        </GridItem>

                        <GridItem xs={3}>
                          <Muted>
                            Последняя оценка: <br/>
                            {userAnswer.lastReviewEmail}<br/>
                            {userAnswer.lastReviewDate}
                          </Muted>
                        </GridItem>

                        <GridItem xs={4}>
                          <TextField
                            label='Комментарий'
                            fullWidth
                            value={userAnswer.comment}
                            onChange={this.handleChangeComment.bind(this, [index, indexAnswer])}
                            multiline
                          />
                        </GridItem>
                      </GridContainer>
                    </div>

                    {userQuestion.user.length - 1 !== indexAnswer && <Divider/>}
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
    groupByQuestion: state.grouping.groupByQuestion,
    questionByQuestion: state.questions.questionByQuestion,
    saveData: state.manipulation.saveData,
    exportData: state.manipulation.exportData,
    isShowPersonalData: state.personalData.isShowPersonalData
  };
}

const mapDispatchToProps = (dispatch) => ({
  getQuestionByQuestion: () => dispatch(getQuestionByQuestion()),
  resetData: () => dispatch(resetData()),
  exportDataInBackEnd: (data, typePage) => dispatch(exportDataInBackEnd(data, typePage)),
  saveDataInBack: (data, typePage) => dispatch(saveDataInBack(data, typePage))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(reviewCardByQuestionStyle)(QuestionCard));
