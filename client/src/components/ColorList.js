import React, { useState } from "react";
import axios from "axios";
import axiosAuth from '../axiosAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {

  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    console.log(colorToEdit, 'color');
    axiosAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
               .then(res => {
                 console.log('res from put', res.data);
                 console.log('colors', colors);

                 const updatedColors = colors.map(color => {
                   if (color.id === colorToEdit.id) {
                     return colorToEdit;
                   } return color;
                 })
                 updateColors(updatedColors);
                })
               .catch(err => console.log(err.response));

    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
                .then(res => {
                  console.log(res);
                  const deletedColors = colors.filter( oldColor => color.id !== oldColor.id );
                  updateColors(deletedColors);
                })
                .catch(err => console.log(err.response))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
