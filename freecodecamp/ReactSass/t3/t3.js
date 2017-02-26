/**
 * Created by Administrator on 2017/2/15.
 */
// var recipe=(typeof localStorage["recipes"] != "undefined") ? JSON.parse(localStorage.getItem("recipes")):[
//     {title: "Pumpkin Pie", ingredients: ["Pumpkin Puree", "Sweetened Condensed Milk", "Eggs", "Pumpkin Pie Spice", "Pie Crust"]},
//     {title: "Spaghetti", ingredients: ["Noodles", "Tomato Sauce", "(Optional) Meatballs"]},
//     {title: "Onion Pie", ingredients: ["Onion", "Pie Crust", "Sounds Yummy right?"]}
// ];console.log(recipe)
var Ingredients=React.createClass({
    render: function() {
        return <ul>{ this.props.ingredients.map(function (i) {
            return <li>{i}</li>
        })}</ul>
    }
});
var RecipeList=React.createClass({
    getInitialState() {
        return {
            recipe:this.props.recipe,
            show: 0,
            title: this.props.recipe[0].title,
            ingredients:this.props.recipe[0].ingredients
        }
    },
    handleClick: function(i) {
        if(parseInt(i)!==this.state.show){
            this.setState({
                show:i,
                title: this.state.recipe[i].title,
                ingredients:this.state.recipe[i].ingredients
            });
        }
    },
    edit:function (event) {
        event.preventDefault();
        $('#editModal').modal('hide');
        var recipe=this.state.recipe;
        recipe[this.state.show]={title: this.state.title, ingredients: this.state.ingredients.split(",")};
        this.setState({
            recipe: recipe});
        this.props.callbackParent(this.state.recipe);
    },
    handleChange: function(name,event) {
        var newState={};
        newState[name]=event.target.value;
        this.setState(newState);
    },
    delete: function(i) {
        var recipe=this.state.recipe;
        recipe.splice(i, 1);
        this.setState({
            recipe:recipe
        });
        this.props.callbackParent(this.state.recipe);
    },
    render: function() {
        var o = this;
        return         <div>{ this.state.recipe.map(function (s,i) {
               return <div className="panel panel-default">
                   <div className="panel-heading">
                       <h3 className="panel-title" onClick={o.handleClick.bind(this, i)}>
                           {s.title}
                       </h3>
                   </div>
                   <div className={i===o.state.show ? "panel-body show":"panel-body"}>
                       <Ingredients ingredients={s.ingredients} />
                       <div className="btn-box">
                           <button className="btn btn-success" data-toggle="modal" data-target="#editModal">edit</button>
                           <button className="btn btn-default" onClick={o.delete.bind(this, i)}>delete</button>
                       </div>
                   </div>

               </div>
           })}
            <div className="modal fade" id="editModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Edit Recipe</h4>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="title">title</label>
                                    <input type="text" className="form-control" value={this.state.title} onChange={this.handleChange.bind(this,'title')} id="title" placeholder="title"/>
                                </div>
                                <div class="form-group">
                                    <label for="ingredients">ingredients</label>
                                    <textarea  className="form-control" id="ingredients" value={this.state.ingredients} onChange={this.handleChange.bind(this,'ingredients')} placeholder="ingredients"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                            <button type="button" className="btn btn-primary"  onClick ={this.edit}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
});
var AddRecipe=React.createClass({
    getInitialState() {
        return {
            recipe:this.props.recipe,
            title: "",
            ingredients:""
        }
    },
    handleClick: function(event) {
        event.preventDefault();
        $('#myModal').modal('hide');
        var a=this.state.recipe;
        a.push({title: this.state.title, ingredients: this.state.ingredients.split(",")});
        this.setState({ 
            recipe: a,
            title: "",
            ingredients:""});
        this.props.callbackParent(this.state.recipe);
    },
    handleChange: function(name,event) {
        var newState={};
        newState[name]=event.target.value;
        this.setState(newState);
    },
    render: function() {
        return <div>
            <button className="btn btn-primary" data-toggle="modal" data-target="#myModal">AddRecipe</button>
            <div className="modal fade" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Add Recipe</h4>
                        </div>
                        <div className="modal-body">
                            <form>
                            <div class="form-group">
                                <label for="title">title</label>
                                <input type="text" className="form-control" value={this.state.title} onChange={this.handleChange.bind(this,'title')} id="title" placeholder="title"/>
                            </div>
                            <div class="form-group">
                                <label for="ingredients">ingredients</label>
                                <textarea  className="form-control" id="ingredients" value={this.state.ingredients} onChange={this.handleChange.bind(this,'ingredients')} placeholder="ingredients"/>
                            </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                            <button type="button" className="btn btn-primary"  onClick ={this.handleClick}>提交</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    }
});
var Recipe=React.createClass({
    getInitialState() {
        return {
            recipe:(typeof localStorage["recipes"] != "undefined") ? JSON.parse(localStorage.getItem("recipes")):[
            {title: "Pumpkin Pie", ingredients: ["Pumpkin Puree", "Sweetened Condensed Milk", "Eggs", "Pumpkin Pie Spice", "Pie Crust"]},
            {title: "Spaghetti", ingredients: ["Noodles", "Tomato Sauce", "(Optional) Meatballs"]},
            {title: "Onion Pie", ingredients: ["Onion", "Pie Crust", "Sounds Yummy right?"]}
        ]}
    },
    onChildChanged: function (newrecipe) {
        this.setState({
            recipe:newrecipe
        });
        localStorage.setItem("recipes",JSON.stringify(this.state.recipe))
    },
    render: function() {
        return (
            <div>
                <RecipeList recipe={this.state.recipe} callbackParent={this.onChildChanged} />,
                
                <AddRecipe recipe={this.state.recipe} callbackParent={this.onChildChanged} />
            </div>
        )}
})
ReactDOM.render(
    <Recipe />,
    document.getElementById("container")
);

// var Panel = ReactBootstrap.Panel, Accordion = ReactBootstrap.Accordion;
// var Button = ReactBootstrap.Button, Input = ReactBootstrap.Input;
// var ButtonToolbar = ReactBootstrap.ButtonToolbar;
// var Modal = ReactBootstrap.Modal;
// var OverlayTrigger = ReactBootstrap.OverlayTrigger;
// var ListGroup = ReactBootstrap.ListGroup,ListGroupItem = ReactBootstrap.ListGroupItem;
//
// // Load Recipe Items or set default Recipe Items
// var recipes = (typeof localStorage["recipeBook"] != "undefined") ? JSON.parse(localStorage["recipeBook"]) : [
//     {title: "Pumpkin Pie", ingredients: ["Pumpkin Puree", "Sweetened Condensed Milk", "Eggs", "Pumpkin Pie Spice", "Pie Crust"]},
//     {title: "Spaghetti", ingredients: ["Noodles", "Tomato Sauce", "(Optional) Meatballs"]},
//     {title: "Onion Pie", ingredients: ["Onion", "Pie Crust", "Sounds Yummy right?"]}
// ], globalTitle = "", globalIngredients = []; // Define global title and ingredients
//
//
// // RecipeBook class. This holds all recipes.
// var RecipeBook = React.createClass({
//     render: function() {
//         return (
//             <div>
//                 <Accordion>
//                     {this.props.data}
//                 </Accordion>
//             </div>
//         );
//     }
// });
//
// // Recipe class. This is the display for a recipe in RecipeBook
// var Recipe = React.createClass({
//     remove: function() {
//         recipes.splice(this.props.index, 1);
//         update();
//     },
//     edit: function() {
//         globalTitle = this.props.title;
//         globalIngredients = this.props.ingredients;
//         document.getElementById("show").click();
//     },
//     render: function() {
//         return (
//             <div>
//                 <h4 className="text-center">Ingredients</h4><hr/>
//                 <IngredientList ingredients={this.props.ingredients} />
//                 <ButtonToolbar>
//                     <Button class="delete" bsStyle="danger" id={"btn-del"+this.props.index} onClick={this.remove}>Delete</Button>
//                     <Button bsStyle="default" id={"btn-edit"+this.props.index} onClick={this.edit}>Edit</Button>
//                 </ButtonToolbar>
//             </div>
//         );
//     }
// });
//
// // IngredientList class. This lists all ingredients for a Recipe
// var IngredientList = React.createClass({
//     render: function() {
//         var ingredientList = this.props.ingredients.map(function(ingredient) {
//             return (
//                 <ListGroupItem>
//                     {ingredient}
//                 </ListGroupItem>
//             );
//         });
//         return (
//             <ListGroup>
//                 {ingredientList}
//             </ListGroup>
//         );
//     },
// });
//
// // RecipeAdd class. This contains the Modal and Add Recipe button
// var RecipeAdd = React.createClass({
//     getInitialState: function() {
//         return { showModal: false };
//     },
//     close: function() {
//         globalTitle = "";
//         globalIngredients = [];
//         this.setState({ showModal: false });
//     },
//     open: function() {
//         this.setState({ showModal: true });
//         if (document.getElementById("title") && document.getElementById("ingredients")) {
//             $("#title").val(globalTitle);
//             $("#ingredients").val(globalIngredients);
//             if (globalTitle != "") {
//                 $("#modalTitle").text("Edit Recipe");
//                 $("#addButton").text("Edit Recipe");
//             }
//         }
//         else requestAnimationFrame(this.open);
//     },
//     add: function() {
//         var title = document.getElementById("title").value;
//         var ingredients = document.getElementById("ingredients").value.split(",");
//         var exists = false;
//         for (var i = 0; i < recipes.length; i++) {
//             if (recipes[i].title === title) {
//                 recipes[i].ingredients = ingredients;
//                 exists = true;
//                 break;
//             }
//         }
//         if (!exists) {
//             if (title.length < 1) title = "Untitled";
//             recipes.push({title: title, ingredients: document.getElementById("ingredients").value.split(",")});
//         }
//         update();
//         this.close();
//     },
//     render: function() {
//         return (
//             <div>
//                 <Button
//                     bsStyle="primary"
//                     bsSize="large"
//                     onClick={this.open}
//                     id="show"
//                 >
//                     Add Recipe
//                 </Button>
//                 <Modal show={this.state.showModal} onHide={this.close}>
//                     <Modal.Header closeButton>
//                         <Modal.Title id="modalTitle">Add a Recipe</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <form>
//                             <Input type="text" label="Recipe" placeholder="Recipe Name" id="title" />
//                             <Input type="textarea" label="Ingredients" placeholder="Enter Ingredients,Separated,By Commas" id="ingredients"/>
//                         </form>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button onClick={this.add} bsStyle="primary" id="addButton">Add Recipe</Button>
//                         <Button onClick={this.close}>Close</Button>
//                     </Modal.Footer>
//                 </Modal>
//             </div>
//         );
//     }
// });
//
// // Update function to display all the recipes
// function update() {
//     localStorage.setItem("recipeBook", JSON.stringify(recipes));
//     var rows = [];
//     for (var i=0; i < recipes.length; i++) {
//         rows.push(
//             <Panel header={recipes[i].title} eventKey={i} bsStyle="success">
//                 <Recipe title={recipes[i].title} ingredients={recipes[i].ingredients} index={i}/>
//             </Panel>
//         );
//     }
//     ReactDOM.render(<RecipeBook data={rows}/>, document.getElementById("container"));
// }
//
// // Render the add button (and modal)
// ReactDOM.render(<RecipeAdd/>, document.getElementById("button"));
// update(); // Initially render the recipe book