import React from 'react';
import {connect} from 'react-redux';
import {getMenuData, getMenuDataTest, getQuestionForMenuData,} from './menu.action';
import './menu.less';
import {Link} from 'react-router-dom';
import {withToast} from 'material-ui-toast-redux';
import Tree from 'react-ui-tree';
import '../../../node_modules/react-ui-tree/dist/react-ui-tree.css';


class MenuTree extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuData: []
        };
    }

    componentDidMount() {
        this.setState({menuData: this.props.menuData});
    }

    componentDidUpdate(prevProps) {
        if (this.props.testId !== prevProps.testId ||
            this.props.selectionId !== prevProps.selectionId ||
            this.props.fromTestHomePage !== prevProps.fromTestHomePage ) {

            const {fromTestHomePage, testId, selectionId, getMenuDataTest, getMenuData} = this.props;

            if (fromTestHomePage && testId >= 0) {
                getMenuDataTest(testId);
            }

            if (!fromTestHomePage && selectionId >= 0) {
                getMenuData(selectionId);
            }
        }

        if (this.props.menuData !== prevProps.menuData) {

            const menuData = this.props.menuData || [];

            console.log('componentDidUpdate');
            console.log(this.props);

            this.setState((state) => {
                return {
                    ...state,
                    menuData
                };
            });
        }
    }

    render() {
        const {
            menuData
        } = this.state;


        return (<div className={'menu'}>
                <Tree
                    paddingLeft={40}        // left padding for children nodes in pixels
                    tree={menuData}        // tree object
                    onChange={this.handleChangeTreeMenu}  // onChange(tree) tree object changed
                    renderNode={this.renderNode}  // renderNode(node) return react element
                    draggable={false}
                />
            </div>
        );
    }

    renderNode = node => {
        return (
            <span onClick={this.onClickNode.bind(null, node)}
                  onMouseDown={node.undraggable ? function (e) {
                      e.stopPropagation();
                  } : undefined}>
                {node.description === 'SELECTION' &&
                <Link to={`../../../../../../../admin/selection/${node.id}`}> {node.module}</Link>}
                {node.description === 'TEST' &&
                <Link to={`../../../../../../../admin/test/${node.id}`}> {node.module}</Link>}
                {
                    node.description === 'CATEGORY' &&
                    (node.children ?
                        <Link to={`../../../../../../../admin/category/${node.id}`}>{node.module}</Link> :
                        node.module)
                }
                {node.description === 'QUESTION' &&
                <Link to={`../../../../../../../admin/question/${node.id}`}>{node.module}</Link>}
            </span>
        );
    };

    onClickNode = node => {
        console.log(node);
    };

    handleChangeTreeMenu = (e) => {
        console.log('handleChangeTreeMenu');
        console.log(e);
    };
}

function mapStateToProps(state) {
    return {
        menuData: state.menu.menuData,
        selection: state.selection.selection,
        fromTestHomePage: state.routeNavigation.fromTestHomePage,
    };
}

const mapDispatchToProps = (dispatch) => ({
    getMenuData: (selectionId) => dispatch(getMenuData(selectionId)),
    getMenuDataTest: (testId) => dispatch(getMenuDataTest(testId)),
    getQuestionForMenuData: (selectionId, testId, categoryId, menuData) =>
        dispatch(getQuestionForMenuData(selectionId, testId, categoryId, menuData))
});

export default withToast(connect(mapStateToProps, mapDispatchToProps)(MenuTree));
