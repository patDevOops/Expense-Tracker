import { useState } from "react";
import type { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from "react";
import dayjs from "dayjs";
import { IoIosArrowDown } from "react-icons/io";
import { Barrier } from "../components/barrier.js";
import { FaWallet } from "react-icons/fa";
import "./FormCard.css";
import type {
  Item,
  Category,
  FormType,
  CustomItem,
  RecordType,
  WalletType
} from "../App.js";
type FormCardProps = {
  // Contents passes records here; this component does not currently read the prop.
  records: RecordType[];
  isShowForm: boolean;
  addItems: (newItems: Item) => void;
  category: Category[];
  setIsShowForm: (form: boolean) => void;
  form: FormType;
  // Keep the setter type returned by useState so functional updates are allowed.
  setForm: Dispatch<SetStateAction<FormType>>;
  isEditingItem: boolean;
  saveItem: () => void;
  // FormCard uses map() to show all saved custom items.
  customItems: CustomItem[];
  addWalletRecord:(newWalletRecords:WalletType)=>void;
  saveWalletEdited:(form:WalletType)=>void;
  deleteWalletRecord:(id:string)=>void;
};
export function FormCard({
  isShowForm,
  addItems,
  category,
  setIsShowForm,
  form,
  setForm,
  isEditingItem,
  saveItem,
  customItems,
  addWalletRecord,
  saveWalletEdited,
  deleteWalletRecord,
}: FormCardProps) {
  const [isShowMoreForm, setIsShowMoreForm] = useState<boolean>(false);
  // true = "modified wallet" prompt; the strings pick a specific wallet action.
  const [isShowConfirmModal, setIsShowConfirmModal] = useState<
    boolean | "add-wallet" | "delete-wallet"
  >(false);
  const expandMoreForm = () => {
    setIsShowMoreForm(!isShowMoreForm);
  };
  const [isPickItem, setIspickItem] = useState<boolean>(false);
  const pickItem = () => {
    setIspickItem(!isPickItem);
  };

  // ChangeEvent gives event.target the correct input/select type.
  const inputForm = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    if(name==="category"&&value)localStorage.setItem('category',value)
    setForm(
      (prev) =>
        ({
          ...prev,
          [name]: value,
        }) as FormType,
    );
  };

  const inputNumForm = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = !event.target.value ? "" : Number(event.target.value);
    setForm(
      (prev) =>
        ({
          ...prev,
          [name]: value ? value : "",
        }) as FormType,
    );
  };

  const clickBtnQty = (event: MouseEvent<HTMLButtonElement>) => {
    
    // The cast is type-only; keep using the same event target value as before.
    const { name } = event.target as HTMLButtonElement;
    // The number input can hold "" while the user clears it, kaya string check.
    if (String(form.quantity) === "") {
      setForm((prev) => ({
      ...prev,
      quantity: 1
    }));
      return
    }
    if(name==="decrease"&&form.quantity<=1)return;
    setForm((prev) => ({
      ...prev,
      quantity: name === "increase" ? prev.quantity + 1 : prev.quantity - 1,
    }));
  };

  const addItemsForm = () => {
    if (!form.name || (!form.totalPrice && !form.price)) return;
    let walletId;
    if (form.walletId) {
      walletId = crypto.randomUUID();
      addWalletRecord({
        id: walletId,
        details: `expense on ${form.name}`,
        amount: form.price
          ? -1 * (form.price * form.quantity)
          : -1 * Number(form.totalPrice),
        date: `${form.date ? form.date : dayjs().format("YYYY-MM-D")}`,
      });
    }

    addItems({
      ...form,
      quantity: form.quantity <= 0 ? 1 : form.quantity,
      createdAt: `${form.date ? form.date : dayjs().format("YYYY-MM-D")} ${form.time ? form.time : dayjs().format("h:mm A")}`,
      id: crypto.randomUUID(),
      totalPrice: form.price
        ? (form.price as number) * form.quantity
        : (form.totalPrice as number),
      price: form.price ? (form.price as number) : 0,
      walletId,
    });
  };
  // The caller only passes these three fields; the saved item ID is not used here.
  const pickCustomItem = (
    item: Pick<CustomItem, "price" | "categoryId" | "name">,
  ) => {
    const { price, categoryId, name } = item;

    setForm((prev) => ({
      ...prev,
      quantity: 1,
      price: price,
      totalPrice: price,
      category: categoryId,
      name,
    }));
    setIspickItem(false);
  };
  const renderCategoryName = (id: string) => {
    return category.find((a) => a.id == id)?.categoryName;
  };
  return (
    <>
      <Barrier a={isShowForm} b="barrier-form" c={setIsShowForm} />

      {isShowForm && (
        <div className="form-cont">
          {typeof isShowConfirmModal === "boolean" && isShowConfirmModal && (
            <div className="form-card-confirm-modal">
              <p>Modified Wallet?</p>
              <button
                onClick={() => {
                  const walletId = form.tempWalletId;
                  if (!walletId) return;
                  saveWalletEdited({
                    id: walletId,
                    details: `expense on ${form.name}`,
                    amount: form.price
                      ? -1 * (form.price * form.quantity)
                      : -1 * Number(form.totalPrice),
                    date: `${form.date ? form.date : dayjs().format("YYYY-MM-D")}`,
                  });
                  setIsShowConfirmModal(false);
                  saveItem();
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  saveItem();
                  setIsShowConfirmModal(false);
                }}
              >
                No
              </button>
            </div>
          )}
          {isShowConfirmModal==="add-wallet" && (
            <div className="form-card-confirm-modal">
              <p>Add This Item To Wallet?</p>
              <button
                onClick={() => {
                  const walletId = form.walletId;
                  if (!walletId) return;
                  addWalletRecord({
                    id: walletId,
                    details: `expense on ${form.name}`,
                    amount: form.price
                      ? -1 * (form.price * form.quantity)
                      : -1 * Number(form.totalPrice),
                    date: `${form.date ? form.date : dayjs().format("YYYY-MM-D")}`,
                  });
                  setIsShowConfirmModal(false);
                  saveItem();
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setIsShowConfirmModal(false);
                  saveItem();
                }}
              >
                No
              </button>
            </div>
          )}
          {isShowConfirmModal==="delete-wallet" && (
            <div className="form-card-confirm-modal">
              <p>Delete This Item To Wallet?</p>
              <button
                onClick={() => {
                  const walletId = form.tempWalletId;
                  if (!walletId) return;
                  deleteWalletRecord(walletId);
                  setIsShowConfirmModal(false);
                  saveItem();
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setIsShowConfirmModal(false);
                  saveItem();
                }}
              >
                No
              </button>
            </div>
          )}
          
          <Barrier
            a={isShowConfirmModal}
            b="barrier-form-confirm-modal"
            c={setIsShowConfirmModal}
          />
          <Barrier a={isPickItem} b="barrier-pick-item" c={setIspickItem} />
          <div className="form-name form">
            <label className="label">Item Name</label>
            <div className="form-input-name-cont">
              <input
                name="name"
                placeholder="Item Name"
                className="form-input form-input-name"
                value={form.name}
                onChange={inputForm}
              />

              <div className="pick-item-container">
                {isPickItem && (
                  <div className="pick-item-generated">
                    {customItems.map((customItem) => {
                      const { name, price, categoryId } = customItem;
                      return (
                        <div
                          onClick={() => {
                            pickCustomItem({
                              name,
                              price,
                              categoryId,
                            });
                          }}
                          key={customItem.id}
                        >
                          <span>{customItem.name}</span>
                          <div className="pick-item-gen-description">
                            {renderCategoryName(customItem.categoryId) && (
                              <span>
                                {renderCategoryName(customItem.categoryId)}
                              </span>
                            )}
                            <span>
                              {customItem.price
                                ? `\u20B1${customItem.price.toFixed(2)}`
                                : ""}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <IoIosArrowDown
                  size="23"
                  className={`item-pick-arrow ${isPickItem ? "arrow-rotate-form" : "arrow-rotate-form-return"}`}
                  onClick={pickItem}
                />
              </div>
            </div>
          </div>

          <div className="form-price">
            <div className="form form-row">
              <label className="label">Total Price</label>
              <input
                name="totalPrice"
                placeholder="price"
                className="form-input form-input-price"
                value={
                  form.price
                    ? (form.price as number) * form.quantity
                    : form.totalPrice
                }
                onChange={inputNumForm}
                type="number"
              />
            </div>

            <div className="form form-row">
              <label className="label">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={inputForm}
                className="form-input"
              >
                {category.map((a) => {
                  return (
                    <option 
                      key={a.id} value={a.id}>
                      {a.categoryName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {isShowMoreForm && (
            <div className="more-form">
              <div className="row-container">
                <div className="form form-date">
                  <label className="label">Date</label>
                  <input
                    name="date"
                    value={form.date}
                    className="form-input more-form-input"
                    type="date"
                    onChange={inputForm}
                  />
                </div>
                <div className="form-time form">
                  <label className="label">Time</label>
                  <input
                    name="time"
                    value={form.time}
                    type="time"
                    className="form-input more-form-input"
                    onChange={inputForm}
                  />
                </div>
              </div>
              <div className="row-container">
                <div className="form form-price-each">
                  <label className="label">Price(each)</label>
                  <input
                    name="price"
                    value={form.price}
                    className="form-input"
                    onChange={inputNumForm}
                    placeholder="optional"
                  />
                </div>

                <div className="form form-quantity">
                  <label className="label">Quantity</label>
                  <div className="form-quantity-input-cont">
                    <button
                      name="decrease"
                      onClick={clickBtnQty}
                      className="form-quan-btn"
                    >
                      -
                    </button>

                    <input
                      name="quantity"
                      value={form.quantity}
                      type="number"
                      placeholder="1"
                      className="form-input more-form-input"
                      onChange={inputNumForm}
                    />
                    <button
                      name="increase"
                      onClick={clickBtnQty}
                      className="form-quan-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="form-wallet-toggle">
                  <label className="label">Wallet</label>
                  <div
                    onClick={() => {
                      const newWalletId = form.walletId
                      ? undefined
                      : crypto.randomUUID();
                      setForm({
                      ...form,
                      walletId:newWalletId
                      });
                      
                      localStorage.setItem("wallet-toggle",newWalletId??"");
                    }}
                  >
                    <FaWallet
                      className={`form-wallet-icon ${form.walletId && "active"}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="form-btns">
            <button onClick={expandMoreForm}>
              <IoIosArrowDown
                className={`${isShowMoreForm ? "arrow-rotate-form" : "arrow-rotate-form-return"}`}
                size="22"
              />
            </button>
            <button
              onClick={() => {
                if (isEditingItem) {
                  if(form.tempWalletId&&!form.walletId){
                    setIsShowConfirmModal("delete-wallet");
                    return
                  }
                  if (form.tempWalletId) {
                    setIsShowConfirmModal(true);
                    return;
                  }
                  if (form.walletId) {
                    setIsShowConfirmModal("add-wallet");
                    return;
                  }
                  saveItem();
                  return;
                }
                addItemsForm();
              }}
            >
              {isEditingItem ? "Save" : "Add"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
