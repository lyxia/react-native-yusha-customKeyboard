
#import "CustomKeyboard.h"
#import <React/RCTUIManager.h>
#import <RCTText/RCTTextInput.h>

@implementation CustomKeyboard

@synthesize bridge = _bridge;

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE(CustomKeyboard)

RCT_EXPORT_METHOD(install:(nonnull NSNumber *)reactTag withType:(nonnull NSString *)keyboardType)
{
    //    RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:appDelegate.bridge moduleName:@"HFMoneyRN" initialProperties:@{}];
    UIView* inputView = [[RCTRootView alloc] initWithBridge:_bridge moduleName:@"CustomKeyboard" initialProperties:
                         @{
                           @"tag": reactTag,
                           @"type": keyboardType
                           }
                         ];
    
    inputView.autoresizingMask = UIViewAutoresizingNone;
    inputView.frame = CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width, 252);
    
    UITextView *view = (UITextView *)(((RCTTextInput*)[_bridge.uiManager viewForReactTag:reactTag]).backedTextInputView);
    
    view.inputView = inputView;
    [view reloadInputViews];
}

RCT_EXPORT_METHOD(uninstall:(nonnull NSNumber *)reactTag)
{
    UITextView *view = (UITextView *)(((RCTTextInput*)[_bridge.uiManager viewForReactTag:reactTag]).backedTextInputView);
    
    view.inputView = nil;
    [view reloadInputViews];
}

RCT_EXPORT_METHOD(insertText:(nonnull NSNumber *)reactTag withText:(NSString*)text) {
    UITextView *view = (UITextView *)(((RCTTextInput*)[_bridge.uiManager viewForReactTag:reactTag]).backedTextInputView);
    
    [view replaceRange:view.selectedTextRange withText:text];
}

RCT_EXPORT_METHOD(backSpace:(nonnull NSNumber *)reactTag) {
    UITextView *view = (UITextView *)(((RCTTextInput*)[_bridge.uiManager viewForReactTag:reactTag]).backedTextInputView);
    
    UITextRange* range = view.selectedTextRange;
    if ([view comparePosition:range.start toPosition:range.end] == 0) {
        range = [view textRangeFromPosition:[view positionFromPosition:range.start offset:-1] toPosition:range.start];
    }
    [view replaceRange:range withText:@""];
}

RCT_EXPORT_METHOD(doDelete:(nonnull NSNumber *)reactTag) {
    UITextView *view = (UITextView *)(((RCTTextInput*)[_bridge.uiManager viewForReactTag:reactTag]).backedTextInputView);
    
    UITextRange* range = view.selectedTextRange;
    if ([view comparePosition:range.start toPosition:range.end] == 0) {
        range = [view textRangeFromPosition:range.start toPosition:[view positionFromPosition: range.start offset: 1]];
    }
    [view replaceRange:range withText:@""];
}

RCT_EXPORT_METHOD(moveLeft:(nonnull NSNumber *)reactTag) {
    UITextView *view = (UITextView *)(((RCTTextInput*)[_bridge.uiManager viewForReactTag:reactTag]).backedTextInputView);
    
    UITextRange* range = view.selectedTextRange;
    UITextPosition* position = range.start;
    
    if ([view comparePosition:range.start toPosition:range.end] == 0) {
        position = [view positionFromPosition: position offset: -1];
    }
    
    view.selectedTextRange = [view textRangeFromPosition: position toPosition:position];
}

RCT_EXPORT_METHOD(moveRight:(nonnull NSNumber *)reactTag) {
    UITextView *view = (UITextView *)(((RCTTextInput*)[_bridge.uiManager viewForReactTag:reactTag]).backedTextInputView);
    
    UITextRange* range = view.selectedTextRange;
    UITextPosition* position = range.end;
    
    if ([view comparePosition:range.start toPosition:range.end] == 0) {
        position = [view positionFromPosition: position offset: 1];
    }
    
    view.selectedTextRange = [view textRangeFromPosition: position toPosition:position];
}

RCT_EXPORT_METHOD(switchSystemKeyboard:(nonnull NSNumber*) reactTag) {
    UITextView *view = (UITextView *)(((RCTTextInput*)[_bridge.uiManager viewForReactTag:reactTag]).backedTextInputView);
    
    UIView* inputView = view.inputView;
    view.inputView = nil;
    [view reloadInputViews];
    view.inputView = inputView;
}

RCT_EXPORT_METHOD(clearAll:(nonnull NSNumber *)reactTag){
    UITextView *view = (UITextView *)(((RCTTextInput*)[_bridge.uiManager viewForReactTag:reactTag]).backedTextInputView);
    
    UITextRange* range = view.selectedTextRange;
    if(range.end > 0) {
        range = [view textRangeFromPosition:0 toPosition:range.end];
        [view replaceRange:range withText:@""];
    }
}

@end


