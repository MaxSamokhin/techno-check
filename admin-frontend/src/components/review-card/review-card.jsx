import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Slider from '@material-ui/lab/Slider';
import './review-card.less';

const answerShowLength = 35;

export default class ReviewCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // sliderValue: props.
            showFullQuestionText: props.questionText.length < answerShowLength
        };
    }

    render() {
        const questionText = (this.props.questionText.length > answerShowLength)
                             ? (this.state.showFullQuestionText
                               ? this.props.questionText
                               : this.props.questionText.slice(0, answerShowLength) + '...')
                             : this.props.questionText;

        return (
            <Card className={`review-card ${(this.props.questionAnswers[0].answerIsChecked) ? 'review-card__card__checked' : ''}`}>
                <CardContent>
                    <div className='review-card__block'>
                        <div className='review-card__question'>
                            <div className='review-card__question-title'>
                                Вопрос: {this.props.questionTitle}
                            </div>
                            <div
                                className='review-card__question-text'
                                onClick={() => this.setState({showFullQuestionText: !this.state.showFullQuestionText})}
                                >
                                Текст вопроса: {questionText}
                            </div>
                        </div>

                        <div className='review-card__answer'>
                            Ответ: {this.props.questionAnswers[0].answerText}
                        </div>
                    </div>
                </CardContent>
                <CardActions className='review-card__actions'>
                    <div>
                        <Button className={'review-card__button'}
                                color='primary'
                                onClick={this.props.saveScoreMin}>
                            Не верно
                        </Button>

                        <Button color='primary'
                                variant='contained'
                                className={'review-card__button'}
                                onClick={this.props.saveScoreMax}>
                            Верно
                        </Button>
                    </div>

                    <div>
                        <Slider
                            value={Number(this.props.questionAnswers[0].answerScore ) || 0}
                            min={0}
                            max={Number(this.props.questionDefaultScore)}
                            step={1}
                            onChange={(e, n) => this.props.numberFieldOnChange(n)}
                            />

                        <TextField
                            className={'review-card__field'}
                            id={`answer-score-${this.props.index}`}
                            autoFocus={this.props.index === 0}
                            label='Балл'
                            helperText={`0-${this.props.questionDefaultScore}`}
                            value={this.props.questionAnswers[0].answerScore || 0}
                            onChange={(e) => this.props.numberFieldOnChange(e.target.value)}
                            type='number'
                            variant='filled'
                            margin='dense'
                            inputProps={{ min: '0', max: this.props.questionDefaultScore, step: '1' }}
                            onKeyPress={event => (event.key === 'Enter') ? this.props.saveScore(event) : ''}
                            />

                        <Button color='inherit'
                                className={'review-card__button'}
                                onClick={this.props.saveScore}>
                            Сохранить
                        </Button>
                    </div>
                </CardActions>
            </Card>
        );
    }
}
