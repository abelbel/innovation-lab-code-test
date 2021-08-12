import { mount } from "enzyme";
import DogForm from "../components/Dog/DogForm";
import { waitForComponentToPaint } from "../helpers";

const mockSuccessResponse = {
  url: "https://random.dog/5a4f5744-0cf1-4be8-8fb3-3ec7f1cb611d.mp4",
  size: "123456",
};
const mockJsonPromise = Promise.resolve(mockSuccessResponse);
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
});
var globalRef: any = global;
globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

describe("Import dog button", () => {
  it("populates url field of the form", async () => {
    const wrapper = mount(<DogForm />);
    wrapper.find('button[data-test-id="import-btn"]').simulate("click");
    await waitForComponentToPaint(wrapper);
    const input = wrapper.find('input[data-test-id="url-input"]');
    expect(input.prop("value")).toBe(mockSuccessResponse.url);
  });
});

describe("Form cannot be submitted", () => {
  it("with blank url and caption fields", async () => {
    const wrapper = mount(<DogForm />);
    await waitForComponentToPaint(wrapper);
    const submitBtn = wrapper.find('button[data-test-id="submit-btn"]');
    expect(submitBtn.prop("disabled")).toBe(true);
  });

  it("with blank url field", async () => {
    const wrapper = mount(<DogForm />);
    wrapper
      .find('input[data-test-id="caption-input"]')
      .simulate("change", { target: { value: "This is a test caption." } });
    await waitForComponentToPaint(wrapper);
    const submitBtn = wrapper.find('button[data-test-id="submit-btn"]');
    expect(submitBtn.prop("disabled")).toBe(true);
  });

  it("with blank caption field", async () => {
    const wrapper = mount(<DogForm />);
    wrapper.find('button[data-test-id="import-btn"]').simulate("click");
    await waitForComponentToPaint(wrapper);
    const submitBtn = wrapper.find('button[data-test-id="submit-btn"]');
    expect(submitBtn.prop("disabled")).toBe(true);
  });
});

describe("Form can be submitted", () => {
  it("with complete url and caption fields", async () => {
    const wrapper = mount(<DogForm />);

    wrapper.find('button[data-test-id="import-btn"]').simulate("click");
    await waitForComponentToPaint(wrapper);
    const urlInput = wrapper.find('input[data-test-id="url-input"]');
    expect(urlInput.prop("value")).toBe(mockSuccessResponse.url);

    const testCaption = "This is a test caption.";
    wrapper
      .find('input[data-test-id="caption-input"]')
      .simulate("change", { target: { value: testCaption } });
    await waitForComponentToPaint(wrapper);
    const captionInput = wrapper.find('input[data-test-id="caption-input"]');
    expect(captionInput.prop("value")).toBe(testCaption);

    const submitBtn = wrapper.find('button[data-test-id="submit-btn"]');
    expect(submitBtn.prop("disabled")).toBe(false);
  });
});
