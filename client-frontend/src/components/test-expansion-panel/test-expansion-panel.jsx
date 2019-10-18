import React from 'react';
import {connect} from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import {startTest} from '../../actions/user.action';
import './test-expansion-panel.less';
import {Redirect} from 'react-router-dom';

class TestExpansionPanel extends React.Component {
    constructor(props) {
        super(props);

        this.onClickStartTest = this.onClickStartTest.bind(this);
    }

    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };


    onClickStartTest(userTestId) {
        const testTitle = this.props.userTests.find(x => x.userTestId === userTestId).testTitle;
        this.props.startTest(userTestId, testTitle);
    }


    render() {
        const { expanded } = this.state;

        if (this.props.questionId) {
            return <Redirect to={`/question/${this.props.userTestId}`}/>;
        }

        return (
            <div className='test-expansion-panel'>
                <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')} disabled={this.props.isDisabled}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className='test-expansion-panel__header'>{this.props.title + (this.props.isDisabled ? ' (завершён)' : '')}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className='test-expansion-panel__info'>
                            <Typography className='test-expansion-panel__limit'>
                                {'Лимит времени: ' + this.props.timeLimit}
                            </Typography>
                            <Typography className='test-expansion-panel__description'>
                                *Описание теста*
                            </Typography>
                        </div>
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            onClick={this.onClickStartTest.bind(this, this.props.userTestId)}
                            >
                            {'Начать тестирование'}
                        </Button>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

const mapDispatchToProps = {
    startTest: startTest
};

function mapStateToProps(state) {
    return {
        userTests: state.user.userTests,
        questionId: state.question.questionId,
        finishedTests: state.question.finishedTests
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(TestExpansionPanel);

