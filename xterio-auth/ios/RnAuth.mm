#import "RnAuth.h"
#import <AuthenticationServices/AuthenticationServices.h>

static NSString *const RCTNativeLocalStorageKey = @"local-storage";

@interface RnAuth ()<ASWebAuthenticationPresentationContextProviding>

@property (strong, nonatomic) NSUserDefaults *localStorage;

@end

@implementation RnAuth

RCT_EXPORT_MODULE(NativeRnAuth)

- (id) init {
  if (self = [super init]) {
    _localStorage = [[NSUserDefaults alloc] initWithSuiteName:RCTNativeLocalStorageKey];
  }
  return self;
}
RCT_EXPORT_METHOD(getItem:(NSString *)key resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
  resolve([self.localStorage stringForKey:key]);
}
RCT_EXPORT_METHOD(setItem:(NSString *)key value:(NSString *)value) {
  [self.localStorage setObject:value forKey:key];
}
RCT_EXPORT_METHOD(removeItem:(NSString *)key) {
  [self.localStorage removeObjectForKey:key];
}
RCT_EXPORT_METHOD(clear) {
  NSDictionary *keys = [self.localStorage dictionaryRepresentation];
  for (NSString *key in keys) {
    [self removeItem:key];
  }
}

RCT_EXPORT_METHOD(login:(NSString *)url scheme:(NSString *)scheme resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
  NSURL *authURL = [NSURL URLWithString:url];
  NSString *_scheme = scheme ? scheme : @"xterio-sdk-rn";
  
  ASWebAuthenticationSession *session = [[ASWebAuthenticationSession alloc] initWithURL:authURL
                                                                 callbackURLScheme:_scheme
                                                                      completionHandler:^(NSURL *callbackURL, NSError *error) {
    if (error != nil) {
      NSLog(@"[XterioAuth] Open url error");
      reject(@"XterioAuth", @"open url error", nil);
    }else{
      NSLog(@"[XterioAuth] Authenticated successfully: %@ %@", callbackURL, callbackURL.absoluteString);
      resolve(callbackURL.absoluteString);
    }
  }];
  session.presentationContextProvider = self;
  if(session.canStart){
    [session start];
  }else{
    NSLog(@"[XterioAuth] Can not open url");
    reject(@"XterioAuth", @"canot open url", nil);
  }
}

RCT_EXPORT_METHOD(multiply:(double)a b:(double)b resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
  NSNumber *result = @(a * b);
  resolve(result);
}

//RCT_NEW_ARCH_ENABLED 新写法，兼容Legacy，写法改成上面
/*
- (NSNumber *)multiply:(double)a b:(double)b {
    NSNumber *result = @(a * b);
    return result;
}
 */

- (ASPresentationAnchor)presentationAnchorForWebAuthenticationSession:(ASWebAuthenticationSession *)session{
  __block ASPresentationAnchor anchor;
  dispatch_sync(dispatch_get_main_queue(), ^{
    anchor = [[UIApplication sharedApplication].delegate window];
  });
  return anchor;
}

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRnAuthSpecJSI>(params);
}
#endif
@end
