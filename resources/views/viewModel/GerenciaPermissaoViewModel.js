$(document).ready(function () {
    var gerenciaPermissaoViewModel = new GerenciaPermissaoViewModel();
    gerenciaPermissaoViewModel.init();
});

function GerenciaPermissaoViewModel()
{

}

GerenciaPermissaoViewModel.prototype.init = function () {
    var self = this;
    start();

};

function start()
{

    var gojs = go.GraphObject.make;

    myDiagram = gojs(go.Diagram, "myDiagramDiv", {
        allowDrop: true, // from Palette
        // what to do when a drag-drop occurs in the Diagram's background
        mouseDrop: function (e) {
            finishDrop(e, null);
        }, // Diagram has simple horizontal layout
        layout: gojs(go.GridLayout, {
            wrappingWidth: Infinity,
            alignment: go.GridLayout.Position,
            cellSize: new go.Size(1, 1)
        }),
        initialContentAlignment: go.Spot.Center,
        "commandHandler.archetypeGroupData": {isGroup: true, category: "OfNodes"},
        "undoManager.isEnabled": true
    });

    // There are two templates for Groups, "OfGroups" and "OfNodes".

    // this function is used to highlight a Group that the selection may be dropped into
    function highlightGroup(e, grp, show)
    {
        if (!grp)
        {
            return;
        }
        e.handled = true;
        if (show)
        {
            // cannot depend on the grp.diagram.selection in the case of external drag-and-drops;
            // instead depend on the DraggingTool.draggedParts or .copiedParts
            var tool = grp.diagram.toolManager.draggingTool;
            var map = tool.draggedParts || tool.copiedParts;  // this is a Map
            // now we can check to see if the Group will accept membership of the dragged Parts
            if (grp.canAddMembers(map.toKeySet()))
            {
                grp.isHighlighted = true;
                return;
            }
        }
        grp.isHighlighted = false;
    }

    // Upon a drop onto a Group, we try to add the selection as members of the Group.
    // Upon a drop onto the background, or onto a top-level Node, make selection top-level.
    // If this is OK, we're done; otherwise we cancel the operation to rollback everything.
    function finishDrop(e, grp)
    {
        var ok = (grp !== null ? grp.addMembers(grp.diagram.selection, true) : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
        if (!ok)
        {
            e.diagram.currentTool.doCancel();
        }
    }

    //Existem dois Templates(modelos) para Grupos, "OfGroups" e "OfNodes"

    myDiagram.groupTemplateMap.add("OfGroups", gojs(go.Group, "Auto", {
            background: "transparent", // highlight when dragging into the Group
            mouseDragEnter: function (e, grp, prev) {
                highlightGroup(e, grp, true);
            }, mouseDragLeave: function (e, grp, next) {
                highlightGroup(e, grp, false);
            }, computesBoundsAfterDrag: true, // when the selection is dropped into a Group, add the selected Parts into that Group;
            // if it fails, cancel the tool, rolling back any changes
            mouseDrop: finishDrop, handlesDragDropForMembers: true,  // don't need to define handlers on member Nodes and Links
            // Groups containing Groups lay out their members horizontally
            layout: gojs(go.GridLayout, {
                wrappingWidth: Infinity, alignment: go.GridLayout.Position, cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4)
            })
        }, new go.Binding("background", "isHighlighted", function (h) {
            return h ? "rgba(255,0,0,0.2)" : "transparent";
        }).ofObject(), gojs(go.Shape, "Rectangle", {fill: null, stroke: "#737373", strokeWidth: 2}), gojs(go.Panel, "Vertical",  // title above Placeholder
        gojs(go.Panel, "Horizontal",  // button next to TextBlock
            {stretch: go.GraphObject.Horizontal, background: "#737373"}, gojs("SubGraphExpanderButton", {alignment: go.Spot.Right, margin: 5}), gojs(go.TextBlock, {
                alignment: go.Spot.Left, editable: true, margin: 5, font: " 18px sans-serif", opacity: 1, stroke: "#fbedff"
            }, new go.Binding("text", "text").makeTwoWay())),  // end Horizontal Panel
        gojs(go.Placeholder, {padding: 5, alignment: go.Spot.TopLeft}))  // end Vertical Panel
    ));  // end Group and call to add to template Map

    myDiagram.groupTemplateMap.add("OfNodes", gojs(go.Group, "Auto", {
            background: "transparent", ungroupable: true, // highlight when dragging into the Group
            mouseDragEnter: function (e, grp, prev) {
                highlightGroup(e, grp, true);
            }, mouseDragLeave: function (e, grp, next) {
                highlightGroup(e, grp, false);
            }, computesBoundsAfterDrag: true, // when the selection is dropped into a Group, add the selected Parts into that Group;
            // if it fails, cancel the tool, rolling back any changes
            mouseDrop: finishDrop, handlesDragDropForMembers: true,  // don't need to define handlers on member Nodes and Links
            // Groups containing Nodes lay out their members vertically
            layout: gojs(go.GridLayout, {
                wrappingColumn: 1, alignment: go.GridLayout.Position, cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4)
            })
        }, new go.Binding("background", "isHighlighted", function (h) {
            return h ? "rgba(255,0,0,0.2)" : "transparent";
        }).ofObject(), gojs(go.Shape, "Rectangle", {fill: null, stroke: "#aa00ff", strokeWidth: 2}), gojs(go.Panel, "Vertical",  // title above Placeholder
        gojs(go.Panel, "Horizontal",  // button next to TextBlock
            {stretch: go.GraphObject.Horizontal, background: "#aa00ff"}, gojs("SubGraphExpanderButton", {alignment: go.Spot.Right, margin: 5}), gojs(go.TextBlock, {
                alignment: go.Spot.Left, editable: true, margin: 5, font: " 16px sans-serif", opacity: 1, stroke: "#ffffff"
            }, new go.Binding("text", "text").makeTwoWay())),  // end Horizontal Panel
        gojs(go.Placeholder, {padding: 5, alignment: go.Spot.TopLeft}))  // end Vertical Panel
    ));  // end Group and call to add to template Map

    myDiagram.nodeTemplate = gojs(go.Node, "Auto", { // dropping on a Node is the same as dropping on its containing Group, even if it's top-level
        mouseDrop: function (e, nod) {
            finishDrop(e, nod.containingGroup);
        }
    }, gojs(go.Shape, "Rectangle", {fill: "#c9c9c9", stroke: null}, new go.Binding("fill", "color")), gojs(go.TextBlock, {
        margin: 5, editable: true, font: "bold 13px sans-serif", opacity: 0.75, stroke: "#404040"
    }, new go.Binding("text", "text").makeTwoWay()));

    // initialize the Palette and its contents
    myPalette = gojs(go.Palette, "myPaletteDiv", {
        nodeTemplateMap: myDiagram.nodeTemplateMap, groupTemplateMap: myDiagram.groupTemplateMap, layout: gojs(go.GridLayout, {wrappingColumn: 1, alignment: go.GridLayout.Position})
    });

    myPalette.model = new go.GraphLinksModel([
        {text: "Meus atendimentos", color: "#eeeeee"},
        {text: "Estatísticas", color: "#eeeeee"},
        {text: "Solicitações", color: "#eeeeee"}]);

    /*var slider = document.getElementById("levelSlider");
    slider.addEventListener('change', reexpand);
    slider.addEventListener('input', reexpand);*/

    load();
}

function expandGroups(g, i, level)
{
    if (!(g instanceof go.Group))
    {
        return;
    }
    g.isSubGraphExpanded = i < level;
    g.memberParts.each(function (m) {
        expandGroups(m, i + 1, level);
    })
}

function reexpand(e)
{
    myDiagram.startTransaction("reexpand");
    var level = parseInt(document.getElementById("levelSlider").value);
    myDiagram.findTopLevelGroups().each(function (g) {
        expandGroups(g, 0, level);
    })
    myDiagram.commitTransaction("reexpand");
}

// save a model to and load a model from JSON text, displayed below the Diagram
function save()
{
    document.getElementById("textareaModelJson").value = myDiagram.model.toJson();
    myDiagram.isModified = false;
}

function load()
{
    myDiagram.model = go.Model.fromJson(document.getElementById("textareaModelJson").value);
}
