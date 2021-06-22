defmodule Api.Design.Component do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:parent_id, :document_id, :height, :width, :position_x,
    :position_y, :filled, :rounded, :align_horizontal, :align_vertical, :margin_top,
    :margin_right, :margin_bottom, :margin_left, :padding_top, :padding_right,
    :padding_bottom, :padding_left]}

  schema "components" do
    field :parent_id, :integer
    field :height, :integer
    field :width, :integer
    field :position_x, :integer
    field :position_y, :integer
    field :filled, :boolean
    field :rounded, :integer
    field :align_horizontal, :string
    field :align_vertical, :string
    field :margin_top, :integer
    field :margin_right, :integer
    field :margin_bottom, :integer
    field :margin_left, :integer
    field :padding_top, :integer
    field :padding_right, :integer
    field :padding_bottom, :integer
    field :padding_left, :integer
    field :document_id, :id

    timestamps()
  end

  @doc false
  def changeset(component, attrs) do
    component
    |> cast(attrs, [:parent_id, :height, :width, :position_x, :position_y, :filled, :rounded,
      :align_horizontal, :align_vertical, :margin_top, :margin_right, :margin_bottom, :margin_left,
      :padding_top, :padding_right, :padding_bottom, :padding_left, :document_id])
    |> validate_required([:height, :width, :position_x, :position_y, :filled, :rounded, :document_id])
  end
end
